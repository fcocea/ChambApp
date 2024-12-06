CREATE TABLE
  "User" (
    rut VARCHAR(9) PRIMARY KEY,
    phone VARCHAR(11),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password text NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(1) NOT NULL,
    email VARCHAR(50) NOT NULL,
    account_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    can_be_chamber BOOLEAN DEFAULT FALSE
  );

CREATE TABLE
  "Profession" (
    profession_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
  );

CREATE TABLE
  "ChamberProfession" (
    rut VARCHAR(9) NOT NULL,
    profession_id INTEGER NOT NULL,
    PRIMARY KEY (rut, profession_id),
    FOREIGN KEY (rut) REFERENCES "User" (rut) ON DELETE CASCADE,
    FOREIGN KEY (profession_id) REFERENCES "Profession" (profession_id) ON DELETE CASCADE
  );

CREATE
OR REPLACE FUNCTION check_chamber_role () RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM "User"
        WHERE rut = NEW.rut AND can_be_chamber = TRUE
    ) THEN
        RAISE EXCEPTION 'User with RUT % is not authorized as a Chamber.', NEW.rut;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER
  check_chamber_role_trigger BEFORE INSERT
  OR
UPDATE
  ON "ChamberProfession" FOR EACH ROW
EXECUTE
  FUNCTION check_chamber_role ();

CREATE EXTENSION
  IF NOT EXISTS "uuid-ossp";

CREATE TABLE
  "Advertisement" (
    ad_id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status SMALLINT CHECK (status IN (0, 1, 2, 3)) DEFAULT 0,
    price INTEGER CHECK (price > 0),
    start_date TIMESTAMP NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(9) NOT NULL,
    FOREIGN KEY (created_by) REFERENCES "User" (rut) ON DELETE CASCADE
  );

CREATE TABLE
  "AdvertisementApplication" (
    rut VARCHAR(9) NOT NULL,
    ad_id UUID NOT NULL,
    is_accepted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (rut, ad_id),
    FOREIGN KEY (rut) REFERENCES "User" (rut) ON DELETE CASCADE,
    FOREIGN KEY (ad_id) REFERENCES "Advertisement" (ad_id) ON DELETE CASCADE
  );

CREATE
OR REPLACE FUNCTION check_chamber_user_advertisement_application () RETURNS TRIGGER AS $$
BEGIN
    -- Verifica si el usuario que se intenta insertar es distinto al creador del anuncio
    IF NEW.rut = (
        SELECT created_by
        FROM "Advertisement"
        WHERE ad_id = NEW.ad_id
    ) THEN
        RAISE EXCEPTION 'User with RUT % cannot apply to their own advertisement.', NEW.rut;
    END IF;

    -- Verifica si el usuario es un chamber
    IF NOT EXISTS (
        SELECT 1
        FROM "User"
        WHERE rut = NEW.rut AND can_be_chamber = TRUE
    ) THEN
        RAISE EXCEPTION 'User with RUT % is not authorized as a Chamber.', NEW.rut;
    END IF;

    -- Verifica que no exista ninguna tupla en AdvertisementApplication con is_accepted = TRUE
    IF EXISTS (
        SELECT 1
        FROM "AdvertisementApplication"
        WHERE ad_id = NEW.ad_id AND is_accepted = TRUE
    ) THEN
        RAISE EXCEPTION 'An application for this advertisement has already been accepted.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER
  trg_check_chamber_user BEFORE INSERT ON "AdvertisementApplication" FOR EACH ROW
EXECUTE
  FUNCTION check_chamber_user_advertisement_application ();

CREATE TABLE
  "Area" (
    area_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );

CREATE TABLE
  "ChamberSpecialize" (
    rut VARCHAR(9) NOT NULL,
    area_id INTEGER NOT NULL,
    PRIMARY KEY (rut, area_id),
    FOREIGN KEY (rut) REFERENCES "User" (rut) ON DELETE CASCADE,
    FOREIGN KEY (area_id) REFERENCES "Area" (area_id) ON DELETE CASCADE
  );

CREATE TRIGGER
  check_chamber_role_trigger_specialize BEFORE INSERT
  OR
UPDATE
  ON "ChamberSpecialize" FOR EACH ROW
EXECUTE
  FUNCTION check_chamber_role ();

CREATE TABLE
  "AdvertisementArea" (
    ad_id UUID NOT NULL,
    area_id INTEGER NOT NULL,
    PRIMARY KEY (ad_id, area_id),
    FOREIGN KEY (ad_id) REFERENCES "Advertisement" (ad_id) ON DELETE CASCADE,
    FOREIGN KEY (area_id) REFERENCES "Area" (area_id) ON DELETE CASCADE
  );

CREATE TABLE
  "History" (
    ad_id UUID NOT NULL,
    rut_of VARCHAR(9) NOT NULL,
    score_to_of SMALLINT CHECK (score_to_of BETWEEN 0 AND 5) DEFAULT NULL,
    rut_ch VARCHAR(9) NOT NULL,
    score_to_ch SMALLINT CHECK (score_to_ch BETWEEN 0 AND 5) DEFAULT NULL,
    end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rut_of) REFERENCES "User" (rut) ON DELETE CASCADE,
    FOREIGN KEY (rut_ch) REFERENCES "User" (rut) ON DELETE CASCADE,
    FOREIGN KEY (ad_id) REFERENCES "Advertisement" (ad_id) ON DELETE CASCADE
  );

CREATE
OR REPLACE FUNCTION check_history_insert () RETURNS TRIGGER AS $$
BEGIN
    -- Verifica si el creador del anuncio coincide con el rut del ofertante del historial
    IF NOT EXISTS (
        SELECT 1
        FROM "Advertisement"
        WHERE ad_id = NEW.ad_id AND created_by = NEW.rut_of
    ) THEN
        RAISE EXCEPTION 'User with RUT % is not the creator of the advertisement %.', NEW.rut_of, NEW.ad_id;
    END IF;

    -- Verifica si hay un chamber aceptado para el anuncio y este coincide con el rut_ch
    IF NOT EXISTS (
        SELECT 1
        FROM "AdvertisementApplication"
        WHERE ad_id = NEW.ad_id AND rut = NEW.rut_ch AND is_accepted = TRUE
    ) THEN
        RAISE EXCEPTION 'No accepted chamber or mismatch for the advertisement %.', NEW.ad_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER
  check_advertisement_history_trigger BEFORE INSERT
  OR
UPDATE
  ON "History" FOR EACH ROW
EXECUTE
  FUNCTION check_history_insert ();

CREATE
OR REPLACE FUNCTION insert_history_on_status_change () RETURNS TRIGGER AS $$
BEGIN
    -- Verifica si el nuevo estado es 2 y el estado anterior era diferente
    IF NEW.status = 2 AND OLD.status IS DISTINCT FROM NEW.status THEN
        -- Inserta el registro en la tabla History
        INSERT INTO "History" (ad_id, rut_of, rut_ch, end_date)
        VALUES (
            NEW.ad_id,
            NEW.created_by,
            (SELECT rut FROM "AdvertisementApplication" WHERE ad_id = NEW.ad_id AND is_accepted = TRUE LIMIT 1),
            CURRENT_TIMESTAMP
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER
  trg_insert_history_on_status_change
AFTER
UPDATE
  OF status ON "Advertisement" FOR EACH ROW
EXECUTE
  FUNCTION insert_history_on_status_change ();

CREATE TABLE "Chat" (
    "id" UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "advertisement_id" UUID NOT NULL UNIQUE REFERENCES "Advertisement"("ad_id")
);

CREATE FUNCTION check_advertisement_status() RETURNS TRIGGER AS $$
BEGIN
    IF (
        SELECT "status"
        FROM "Advertisement"
        WHERE "ad_id" = NEW."advertisement_id"
    ) = 0 THEN
        RAISE EXCEPTION 'No se puede crear un chat si el estado del anuncio es 0.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_advertisement_status_trigger
BEFORE INSERT ON "Chat"
FOR EACH ROW
EXECUTE PROCEDURE check_advertisement_status();

CREATE TABLE "ChatMessage" (
    "id" SERIAL PRIMARY KEY,
    "chat_id" UUID NOT NULL REFERENCES "Chat"("id"),
    "sender_rut" VARCHAR(9) NOT NULL REFERENCES "User"("rut"),
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE FUNCTION update_chat_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW."updated_at" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_chat_updated_at_trigger
AFTER UPDATE ON "Chat"
FOR EACH ROW
EXECUTE PROCEDURE update_chat_updated_at();
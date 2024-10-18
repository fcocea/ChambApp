<h2 align="center"> Servidor de ChambApp</h3>
<p align="center">
Backend de la aplicación ChambApp, desarrollado con FastAPI y PostgreSQL.
</p>

### Requerimientos
- [Python ^3.12](https://www.python.org/downloads/) 
- [Poetry](https://python-poetry.org/docs/#installation)

### Instalación
1.  Clonar el repositorio
```bash
git clone https://github.com/fcocea/ChambApp
```

2. Instalar las dependencias
```bash
cd server
poetry install
```
3. Configurar las variables de entorno
```bash
cp .env.example .env
```

4. Lanzar el servidor
```bash
poetry run uvicorn app.main:app --reload 
```

5. La API se estará ejecutando en: [http:// localhost:8000](http://localhost:8000)

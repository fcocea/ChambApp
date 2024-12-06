import { useEffect, useState } from "react";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

import { useAuth } from "@/hooks/useAuth";
interface FormData {
  title: string;
  description: string;
  address: string;
  price: number;
  areas: number[];
  date: Date;
}

interface Areas {
  area_id: number;
  name: string;
}

type DateMode = "date" | "time";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function Create() {
  const { ...methods } = useForm<FormData>();

  const { control, getValues } = useForm();
  const { formState: { errors } } = methods;
  const [loading, setLoading] = useState(false);

  const [date] = useState(new Date());
  const [mode, setMode] = useState<DateMode>("date");
  const [show, setShow] = useState(false);
  const router = useRouter();

  const showMode = (currentMode: DateMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const onChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (mode === "date") {
      setMode("time");
      setShow(true);
    }
    if (mode === "time" && selectedDate) {
      const date = new Date(getValues("date"));
      const hours = selectedDate.getHours();
      const minutes = selectedDate.getMinutes();
      return new Date(date.setHours(hours, minutes, 0, 0));
    }
    return selectedDate;
  };

  const maxItems = 2;
  const [areas, setAreas] = useState<Areas[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(`${API_URL}/areas`);
        const data = await response.json();
        setAreas(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setAreas([]);
        setIsLoading(false);
      }
    };
    fetchAreas();
  }, []);

  const { authState } = useAuth();

  const createAdvertisement = async ({ title, description, address, price, areas }: Partial<FormData>) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/advertisements/create`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Authorization": authState?.token || "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          description: description,
          address: address,
          price: price,
          areas: areas,
          start_date: getValues("date").getTime()
        })
      });
      setLoading(false);
      if (response.ok) {
        Alert.alert("Publicación creada", "Tu publicación ha sido creada exitosamente.", [
          {
            text: "OK",
            onPress: () => {
              router.replace("/(user)/(tabs)/");
            }
          }
        ]);
      } else {
        Alert.alert("Error", "Ha ocurrido un error al crear la publicación. Por favor, intenta nuevamente.", [
          {
            text: "OK",
            onPress: () => {
              router.replace("/(user)/(advertisement)/create");
            }
          }
        ]);
      }
    } catch (error) {
      console.error("Error creating a job:", error);
    }
  };

  const onSubmit: SubmitHandler<FormData> = ({ title, description, address, price, areas }: Partial<FormData>) => {
    createAdvertisement({ title, description, address, price, areas });
  };

  return (
    <ScrollView contentContainerClassName="flex-grow">
      <View className="flex flex-col gap-2 py-4 px-6 bg-background flex-1">
        <FormProvider {...methods}>
          <View className="flex flex-col gap-1">
            <Text className="font-bold text-xl">
              Título
            </Text>
            <Controller
              name="title"
              rules={{
                required: "Este campo es requerido"
              }}
              render={({ field }) => (
                <TextInput
                  placeholder="Ingresa título de la publicación"
                  className={`w-full h-14  border rounded-xl px-5 bg-white ${errors?.title?.message ? "border-red-600" : "border-borderGray"}`}
                  placeholderTextColor="#BDBDBD"
                  defaultValue={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
            <Text className={`${errors?.title?.message ? "" : "invisible"} text-sm text-red-600`}>
              {errors?.title?.message ? (errors?.title?.message as string) : "n/a"}
            </Text>
          </View>
          <View className="flex flex-col gap-1">
            <Text className="font-bold text-xl">
              Descripción
            </Text>
            <Controller
              name="description"
              rules={{
                required: "Este campo es requerido"
              }}
              render={({ field }) => (
                <TextInput
                  placeholder="Ingresa descripción de la publicación"
                  className={`w-full h-20  border rounded-xl px-5 bg-white ${errors?.description?.message ? "border-red-600" : "border-borderGray"}`}
                  placeholderTextColor="#BDBDBD"
                  multiline
                  defaultValue={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
            <Text className={`${errors?.description?.message ? "" : "invisible"} text-sm text-red-600`}>
              {errors?.description?.message ? (errors?.description?.message as string) : "n/a"}
            </Text>
          </View>
          <View className="flex flex-col gap-1">
            <Text className="font-bold text-xl">
              Fecha
            </Text>
            <Controller
              name="date"
              control={control}
              rules={{
                required: "Este campo es requerido"
              }}
              render={({ field }) => (
                <>
                  <TextInput
                    placeholder="Ingresa la fecha en la que requieres el servicio"
                    className={`w-full h-14  border rounded-xl px-5 bg-white ${errors?.date?.message ? "border-red-600" : "border-borderGray"}`}
                    placeholderTextColor="#BDBDBD"
                    value={field.value?.toLocaleString() || ""}
                    onPress={showDatepicker}
                    showSoftInputOnFocus={false}
                  />
                  <SafeAreaView>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        onChange={(event, selectedDate) => field.onChange(onChange(event, selectedDate))}
                        minimumDate={new Date()}
                      />
                    )}
                  </SafeAreaView>
                </>
              )}
            />

            <Text className={`${errors?.title?.message ? "" : "invisible"} text-sm text-red-600`}>
              {errors?.title?.message ? (errors?.title?.message as string) : "n/a"}
            </Text>
          </View>
          <View className="flex flex-col gap-1">
            <Text className="font-bold text-xl">
              Dirección
            </Text>
            <Controller
              name="address"
              rules={{
                required: "Este campo es requerido"
              }}
              render={({ field }) => (
                <TextInput
                  placeholder="Ingresa la dirección en la que requieres el servicio"
                  className={`w-full h-14  border rounded-xl px-5 bg-white ${errors?.address?.message ? "border-red-600" : "border-borderGray"}`}
                  placeholderTextColor="#BDBDBD"
                  defaultValue={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
            <Text className={`${errors?.address?.message ? "" : "invisible"} text-sm text-red-600`}>
              {errors?.address?.message ? (errors?.address?.message as string) : "n/a"}
            </Text>
          </View>
          <View className="flex flex-col gap-1">
            <Text className="font-bold text-xl">
              Precio
            </Text>
            <Controller
              name="price"
              rules={{
                required: "Este campo es requerido"
              }}
              render={({ field }) => (
                <TextInput
                  placeholder="Ingresa el monto a pagar por el servicio"
                  className={`w-full h-14  border rounded-xl px-5 bg-white ${errors?.price?.message ? "border-red-600" : "border-borderGray"}`}
                  placeholderTextColor="#BDBDBD"
                  keyboardType="numeric"
                  defaultValue={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
            <Text className={`${errors?.price?.message ? "" : "invisible"} text-sm text-red-600`}>
              {errors?.price?.message ? (errors?.price?.message as string) : "n/a"}
            </Text>
          </View>
          <View className="flex flex-col gap-1">
            <Text className="font-bold text-xl">
              Áreas
            </Text>
            <Controller
              name="areas"
              rules={{
                required: "Este campo es requerido"
              }}
              render={({ field }) => (
                <>
                  <SectionedMultiSelect
                    items={areas}
                    IconRenderer={
                      props =>
                        isLoading
                          ? (
                              <ActivityIndicator size="small" color="#1B456D" />
                            )
                          : (
                              <Icon {...props} />
                            )
                    }
                    loadingComponent={<ActivityIndicator size="small" color="#1B456D" />}
                    loading={isLoading}
                    uniqueKey="area_id"
                    key={isLoading ? "loading" : "loaded"}
                    subKey="children"
                    colors={{ success: "#1B456D", primary: "#1B456D" }}
                    selectText={
                      field.value?.length
                        ? field.value
                          .map((area_id: number) => {
                            const selectedItem = areas.find(area => area.area_id === area_id);
                            return selectedItem?.name || "";
                          })
                          .join(", ")
                        : "Ingresa las áreas asociadas al servicio"
                    }
                    showChips={false}
                    hideSearch={true}
                    alwaysShowSelectText={true}
                    disabled={isLoading}
                    onSelectedItemsChange={selectedItems => {
                      if (selectedItems.length >= maxItems) {
                        if (selectedItems.length === maxItems) {
                          field.onChange(selectedItems);
                        }
                        return;
                      }
                      field.onChange(selectedItems);
                    }}
                    selectedItems={field.value || []} // Establece el valor actual del campo
                    showDropDowns={true}
                    confirmText="Confirmar"

                    styles={{
                      selectToggle: {
                        width: "100%",
                        height: 50,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: "#dadada",
                        paddingHorizontal: 16,
                        paddingRight: 10,
                        paddingVertical: 10,
                        backgroundColor: "#FFFFFF",
                        justifyContent: "center",
                        alignItems: "center"
                      },
                      selectToggleText: {
                        color: field.value?.length ? "#000000" : "#BDBDBD",
                        fontSize: 14
                      },
                      itemText: {
                        fontSize: 14
                      },
                      item: {
                        height: 50,
                        marginHorizontal: 0
                      },
                      container: {
                        height: areas.length * 57,
                        maxHeight: areas.length * 57,
                        marginVertical: "auto"
                      }
                    }}
                  />
                  <Text
                    className={`${
                      errors?.areas?.message ? "" : "invisible"
                    } text-sm text-red-600`}
                  >
                    {errors?.areas?.message ? (errors?.areas?.message) : "n/a"}
                  </Text>
                </>
              )}
            />

          </View>
        </FormProvider>
        <TouchableOpacity
          className={`w-full py-4 px-3 rounded-xl border border-borderGray bg-primary flex flex-row items-center justify-center gap-2 ${loading ? "opacity-50" : ""}`}
          disabled={loading}
          onPress={() => {
            methods.handleSubmit(onSubmit)();
          }}
        >
          <View className="self-center">
            {loading && <ActivityIndicator color="#ffffff" className="absolute -left-8" />}
            <Text className="text-white text-center text-base font-medium w-fit">Crear publicación</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

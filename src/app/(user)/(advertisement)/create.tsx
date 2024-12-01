import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface FormData {
  title: string;
  description: string;
  date: string;
  address: string;
  price: string;
}

export default function Create() {
  const { ...methods } = useForm();
  // eslint-disable-next-line
  const { control, handleSubmit } = useForm();
  const { formState: { errors } } = methods;

  const onSubmit: SubmitHandler<FormData> = ({ title, description, date, address, price }) => {
    console.log(title, description, date, address, price);
  };

  return (
    <View className="flex flex-col gap-0 py-4 px-6">
      <FormProvider {...methods}>
        <View className="gap-3">
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
            {errors?.title?.message ? errors?.title?.message : "n/a"}
          </Text>
        </View>
        <View className="gap-3">
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
                className={`w-full h-20  border rounded-xl px-5 bg-white ${errors?.email?.message ? "border-red-600" : "border-borderGray"}`}
                placeholderTextColor="#BDBDBD"
                defaultValue={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          <Text className={`${errors?.title?.message ? "" : "invisible"} text-sm text-red-600`}>
            {errors?.title?.message ? errors?.title?.message : "n/a"}
          </Text>
        </View>
        <View className="gap-3">
          <Text className="font-bold text-xl">
            Fecha
          </Text>
          <Controller
            name="date"
            rules={{
              required: "Este campo es requerido"
            }}
            render={({ field }) => (
              <TextInput
                placeholder="Ingresa la fecha en la que requieres el servicio"
                className={`w-full h-14  border rounded-xl px-5 bg-white ${errors?.email?.message ? "border-red-600" : "border-borderGray"}`}
                placeholderTextColor="#BDBDBD"
                defaultValue={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          <Text className={`${errors?.title?.message ? "" : "invisible"} text-sm text-red-600`}>
            {errors?.title?.message ? errors?.title?.message : "n/a"}
          </Text>
        </View>
        <View className="gap-3">
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
                className={`w-full h-14  border rounded-xl px-5 bg-white ${errors?.email?.message ? "border-red-600" : "border-borderGray"}`}
                placeholderTextColor="#BDBDBD"
                defaultValue={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          <Text className={`${errors?.title?.message ? "" : "invisible"} text-sm text-red-600`}>
            {errors?.title?.message ? errors?.title?.message : "n/a"}
          </Text>
        </View>
        <View className="gap-3">
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
                className={`w-full h-14  border rounded-xl px-5 bg-white ${errors?.email?.message ? "border-red-600" : "border-borderGray"}`}
                placeholderTextColor="#BDBDBD"
                defaultValue={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          <Text className={`${errors?.title?.message ? "" : "invisible"} text-sm text-red-600`}>
            {errors?.title?.message ? errors?.title?.message : "n/a"}
          </Text>
        </View>
        <View className="gap-3">
          <Text className="font-bold text-xl">
            Áreas
          </Text>
          <Controller
            name="areas"
            rules={{
              required: "Este campo es requerido"
            }}
            render={({ field }) => (
              <TextInput
                placeholder="Ingresa las áreas asociadas al servicio"
                className={`w-full h-14  border rounded-xl px-5 bg-white ${errors?.email?.message ? "border-red-600" : "border-borderGray"}`}
                placeholderTextColor="#BDBDBD"
                defaultValue={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          <Text className={`${errors?.title?.message ? "" : "invisible"} text-sm text-red-600`}>
            {errors?.title?.message ? errors?.title?.message : "n/a"}
          </Text>
        </View>
      </FormProvider>
      <TouchableOpacity
        className="w-full py-4 px-3 rounded-xl border border-borderGray bg-primary flex flex-row items-center justify-center gap-2"
        onPress={() => {
          methods.handleSubmit(onSubmit)();
        }}
      >
        <Text className="text-white text-center text-base font-medium w-fit">Crear publicación</Text>
      </TouchableOpacity>
    </View>
  );
}

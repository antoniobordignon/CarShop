import NoImage from "@/src/assets/images/noimage.jpg";
import Button from "@/src/components/button";
import { getCarByIdFromLocalDB } from "@/src/repositories/carRepository";
import { createOrder } from "@/src/services/carService";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CarDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCar() {
      try {
        const result = await getCarByIdFromLocalDB(Number(id));
        setCar(result);
      } catch (error) {
        console.error("Erro ao carregar carro:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCar();
  });

  async function handleSell() {
    if (!car) return;

    try {
      await createOrder({
        carId: car.id,
        price: car.price,
        vendorId: 1,
        customerName: "Cliente Teste",
      });

      alert("Venda registrada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar venda.");
    }
  }

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Carregando...</Text>
      </View>
    );
  if (!car) return <Text>Carro não encontrado</Text>;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white">
        <View className="flex-row justify-between items-center px-4 py-4 bg-black">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-white text-lg">{"<"}</Text>
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">Visualização</Text>
          <TouchableOpacity>
            <Text className="text-white text-lg">🔗</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={car.images?.[0]?.url ? { uri: car.images[0].url } : NoImage}
          className="w-full h-64 mt-4"
          resizeMode="contain"
        />

        <View className="px-4 mt-4">
          <Text className="text-lg font-bold">
            {car.brand} {car.model}
          </Text>
          <Text className="text-gray-500">{car.year}</Text>

          <Text className="mt-4 font-bold">Detalhes</Text>

          <View className="flex-row justify-between mt-2">
            <View>
              <Text className="text-gray-500">Cor</Text>
              <Text>{car.color}</Text>
            </View>

            <View>
              <Text className="text-gray-500">Quilometragem</Text>
              <Text>{car.km.toLocaleString()}</Text>
            </View>
          </View>

          <View className="mt-2">
            <Text className="text-gray-500">Preço</Text>
            <Text>R$ {car.price.toLocaleString()}</Text>
          </View>

          <View className="mt-4">
            <Text className="text-gray-500 font-bold">Descrição</Text>
            <Text className="mt-1 text-gray-700">{car.description}</Text>
          </View>

          <Button title="vender" onPress={handleSell} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

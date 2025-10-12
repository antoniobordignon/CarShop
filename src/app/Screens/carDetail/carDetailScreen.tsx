import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

// Aqui você importa ou define o mock
import cars from "@/src/assets/data/cars.json";
import Button from "@/src/components/button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CarDetails() {
  const { id } = useLocalSearchParams();
  const carData = cars.find((c) => c.id === id);
  const router = useRouter();

  if (!carData) return <Text>Carro não encontrado</Text>;

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
          source={{ uri: carData.image }}
          className="w-full h-64 mt-4"
          resizeMode="contain"
        />

        <View className="px-4 mt-4">
          <Text className="text-lg font-bold">{carData.title}</Text>
          <Text className="text-gray-500">{carData.year}</Text>

          <Text className="mt-4 font-bold">Detalhes</Text>
          <View className="flex-row justify-between mt-2">
            <View>
              <Text className="text-gray-500">Cor</Text>
              <Text>{carData.color}</Text>
            </View>
            <View>
              <Text className="text-gray-500">Quilometragem</Text>
              <Text>{carData.mileage.toLocaleString()}</Text>
            </View>
          </View>

          <View className="mt-2">
            <Text className="text-gray-500">Preço</Text>
            <Text>{carData.price}</Text>
          </View>

          <View className="mt-4">
            <Text className="text-gray-500 font-bold">Descrição</Text>
            <Text className="mt-1 text-gray-700">{carData.description}</Text>
          </View>

          <Button title="vender" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

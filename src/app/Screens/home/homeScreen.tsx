import CarCard from "@/src/components/carCard";
import { getCarsFromLocalDB } from "@/src/repositories/carRepository";
import { useRouter } from "expo-router";
import { Car, Plus, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { Car as CarType } from "@/src/types/car";

export default function HomeScreen() {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCarsFromLocalDB();
        setCars(data);
      } catch (error) {
        console.error("Erro ao carregar carros do banco local:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter((car) =>
    `${car.brand} ${car.model}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100 px-4 pt-8">
        <TextInput
          placeholder="Buscar por marca, modelo..."
          value={search}
          onChangeText={setSearch}
          className="bg-white rounded-full px-4 py-2 mb-4 shadow"
        />

        <View className="flex-row mb-4">
          <Text className="px-4 py-2 mr-2 rounded-full bg-black text-white">
            Todos
          </Text>
          <Text className="px-4 py-2 mr-2 rounded-full border border-gray-300">
            Novos
          </Text>
          <Text className="px-4 py-2 rounded-full border border-gray-300">
            Usados
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="black" className="mt-10" />
        ) : (
          <FlatList
            data={filteredCars}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarCard
                {...item}
                selected={item.id === selectedId}
                brand={item.brand}
                model={item.model}
                year={item.year.toString()}
                price={item.price.toString()}
                image={ item.images?.[0]?.url ?? ""}
                onPress={() =>
                  router.push({
                    pathname: "/Screens/carDetail/carDetailScreen",
                    params: { id: item.id },
                  })
                }
              />
            )}
          />
        )}
      </View>
      <View className="flex-row justify-around items-center bg-black py-3">
        <TouchableOpacity className="items-center">
          <View className="bg-white/10 rounded-full p-3 mb-1">
            <Car color="white" size={22} />
          </View>
          <Text className="text-white text-xs">Carros</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center"
          onPress={() => router.push("/Screens/carRegister/carRegisterScreen")}
        >
          <View className="bg-white/10 rounded-full p-3 mb-1">
            <Plus color="white" size={22} />
          </View>
          <Text className="text-white text-xs">Cadastro</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View className="bg-white/10 rounded-full p-3 mb-1">
            <User color="white" size={22} />
          </View>
          <Text className="text-white text-xs">Perfil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

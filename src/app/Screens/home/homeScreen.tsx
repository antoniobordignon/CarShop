import cars from "@/src/assets/data/cars.json";
import CarCard from "@/src/components/carCard";
import { useRouter } from "expo-router";
import { Car, Plus, User } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100 px-4 pt-8">
        <TextInput
          placeholder="Buscar por marca, modelo..."
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

        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CarCard
              {...item}
              selected={item.id === selectedId}
              onPress={() =>
                router.push({
                  pathname: "/Screens/carDetail/carDetailScreen",
                  params: { id: item.id },
                })
              }
            />
          )}
          showsVerticalScrollIndicator={false}
        />
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

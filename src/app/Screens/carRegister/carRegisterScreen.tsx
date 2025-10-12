import Button from "@/src/components/button";
import Input from "@/src/components/input";
import { useRouter } from "expo-router";
import { ImagePlus } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CarRegister() {
  const [isNew, setIsNew] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-black py-4 px-4 flex-row items-center">
        <TouchableOpacity className="mr-3" onPress={() => router.back()}>
          <Text className="text-white text-xl">←</Text>
        </TouchableOpacity>
        <Text className="text-white font-bold text-lg">Cadastro de carros</Text>
      </View>
      <ScrollView
        className="flex-1 px-5 pt-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View className="flex-row items-center mb-4">
          <Text className="text-black font-medium mr-3">Novo</Text>
          <Switch value={isNew} onValueChange={setIsNew} />
        </View>
        <Input label="Marca" placeholder="Ex: Fiat" />
        <Input label="Modelo" placeholder="Ex: Pálio" />
        <View className="flex-row justify-between">
          <View className="flex-1 mr-2">
            <Input label="Ano" placeholder="Ex: 2023" keyboardType="numeric" />
          </View>
          <View className="flex-1 ml-2">
            <Input label="Preço" placeholder="R$ 0,00" keyboardType="numeric" />
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-1 mr-2">
            <Input label="Cor" placeholder="Ex: Vermelho" />
          </View>
          <View className="flex-1 ml-2">
            <Input label="Quilometragem" placeholder="Ex: 10.000" keyboardType="numeric" />
          </View>
        </View>
        <Input
          label="Descrição"
          placeholder="Ex: Lorem ipsum..."
          multiline
          numberOfLines={4}
          style={{ textAlignVertical: "top" }}
        />
        <Text className="text-black font-medium mb-2">Fotos</Text>
        <TouchableOpacity className="border-2 border-dashed border-gray-300 rounded-lg h-40 justify-center items-center mb-6">
          <ImagePlus size={40} color="#9CA3AF" />
          <Text className="text-gray-500 mt-2">Adicione imagens</Text>
        </TouchableOpacity>
        <Button title="Cadastrar" />
      </ScrollView>
    </SafeAreaView>
  );
}

import Button from "@/src/components/button";
import Input from "@/src/components/input";
import { createCar } from "@/src/services/carService";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CarRegister() {
  const [isNew, setIsNew] = useState(false);

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [km, setKm] = useState("");
  const [description, setDescription] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const router = useRouter();

  async function handleSubmit() {
  try {
    const result = await createCar({
      new: isNew,
      brand,
      model,
      year: Number(year),
      price: Number(price),
      color,
      km: Number(km),
      description,
      images: images.map((url) => ({ url })),
    });

    console.log("Carro criado:", result);
    router.back();

  } catch (error) {
    console.log("Erro ao criar carro:", error);
  }
}

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-black py-4 px-4 flex-row items-center">
        <TouchableOpacity className="mr-3" onPress={() => router.back()}>
          <Text className="text-white text-xl">{"<"}</Text>
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
        <Input label="Marca" value={brand} onChangeText={setBrand} placeholder="Ex: Fiat" />
        <Input label="Modelo" value={model} onChangeText={setModel} placeholder="Ex: Pálio" />
        <View className="flex-row justify-between">
          <View className="flex-1 mr-2">
            <Input
              label="Ano"
              value={year}
              onChangeText={setYear}
              placeholder="Ex: 2023"
              keyboardType="numeric"
            />
          </View>
          <View className="flex-1 ml-2">
            <Input
              label="Preço"
              value={price}
              onChangeText={setPrice}
              placeholder="R$ 0,00"
              keyboardType="numeric"
            />
          </View>
        </View>
        <View className="flex-row justify-between">
          <View className="flex-1 mr-2">
            <Input
              label="Cor"
              value={color}
              onChangeText={setColor}
              placeholder="Ex: Vermelho"
            />
          </View>
          <View className="flex-1 ml-2">
            <Input
              label="Quilometragem"
              value={km}
              onChangeText={setKm}
              placeholder="Ex: 10.000"
              keyboardType="numeric"
            />
          </View>
        </View>
        <Input
          label="Descrição"
          value={description}
          onChangeText={setDescription}
          placeholder="Ex: Lorem ipsum..."
          multiline
          numberOfLines={4}
          style={{ textAlignVertical: "top" }}
        />
        <Text className="text-black font-medium mt-4 mb-2">Fotos (URL)</Text>
        <Input
          label="URL da imagem"
          placeholder="https://exemplo.com/imagem.jpg"
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        <TouchableOpacity
          className="bg-black rounded-lg py-3 px-4 mt-2 mb-4"
          onPress={() => {
            if (!imageUrl.trim()) return;
            setImages((prev) => [...prev, imageUrl.trim()]);
            setImageUrl("");
          }}
        >
          <Text className="text-white text-center font-medium">Adicionar imagem</Text>
        </TouchableOpacity>
        {images.length > 0 && (
          <View className="mb-6">
            {images.map((url, index) => (
              <Text key={index} className="text-gray-700 mb-1">
                • {url}
              </Text>
            ))}
          </View>
        )}
        <Button title="Cadastrar" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}
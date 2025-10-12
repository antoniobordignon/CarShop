import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type CarCardProps = {
  image: string;
  title: string;
  year: string;
  price: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function CarCard({ image, title, year, price, selected, onPress }: CarCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center bg-white p-4 mb-3 rounded-lg shadow ${selected ? "border-2 border-blue-500" : ""}`}
    >
      <Image
        source={{ uri: image }}
        style={{ width: 80, height: 60, resizeMode: "cover", borderRadius: 8 }}
      />
      <View className="ml-4 flex-1">
        <Text className="text-black font-semibold">{title}</Text>
        <Text className="text-gray-400 text-sm">{year}</Text>
        <Text className="text-blue-600 font-bold mt-1">{price}</Text>
      </View>
    </TouchableOpacity>
  );
}
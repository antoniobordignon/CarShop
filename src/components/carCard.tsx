import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import NoImage from "../assets/images/noimage.jpg";

type CarCardProps = {
  image: string | number;
  model: string;
  brand: string;
  year: string;
  price: string;
  selected?: boolean;
  onPress?: () => void;
};

export default function CarCard({
  image,
  model,
  brand,
  year,
  price,
  selected,
  onPress,
}: CarCardProps) {
  const [loadError, setLoadError] = useState(false);

  const isValidUrl =
    typeof image === "string" &&
    (image.startsWith("http://") || image.startsWith("https://"));

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center bg-white p-4 mb-3 rounded-lg shadow ${
        selected ? "border-2 border-blue-500" : ""
      }`}
    >
      <Image
        source={
          loadError
            ? NoImage
            : typeof image === "number"
            ? image
            : isValidUrl
            ? { uri: image }
            : NoImage
        }
        style={{ width: 80, height: 60, borderRadius: 8, resizeMode: "cover" }}
        onError={() => setLoadError(true)}
      />

      <View className="ml-4 flex-1">
        <Text className="text-black font-semibold">
          {model} - {brand}
        </Text>
        <Text className="text-gray-400 text-sm">{year}</Text>
        <Text className="text-blue-600 font-bold mt-1">{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

import React, { JSX } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
  icon?: JSX.Element;
}

export default function Input({ label, icon, ...rest }: InputProps) {
  return (
    <View className="mb-4">
      <Text className="text-black font-medium mb-1">{label}</Text>
      <View className="flex-row items-center border border-gray-300 rounded-md px-3">
        {icon}
        <TextInput
          className="flex-1 h-11 ml-2 text-gray-700"
          placeholderTextColor="#9CA3AF"
          {...rest}
        />
      </View>
    </View>
  );
}
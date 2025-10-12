import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgColor?: string;
  textColor?: string;
}

export default function Button({
  title,
  bgColor = "black",
  textColor = "white",
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`rounded-md py-3 ${bgColor === "black" ? "bg-black" : ""}`}
      style={{ backgroundColor: bgColor }}
      {...rest}
    >
      <Text
        className="text-center font-semibold text-base"
        style={{ color: textColor }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
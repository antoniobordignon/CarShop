import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgColor?: string;
  textColor?: string;
  loading?: boolean;
}

export default function Button({
  title,
  bgColor = "black",
  textColor = "white",
  loading = false,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={`rounded-md py-3 ${bgColor === "black" ? "bg-black" : ""}`}
      style={{ backgroundColor: bgColor, opacity: loading ? 0.7 : 1 }}
      disabled={loading || disabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <Text
          className="text-center font-semibold text-base"
          style={{ color: textColor }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

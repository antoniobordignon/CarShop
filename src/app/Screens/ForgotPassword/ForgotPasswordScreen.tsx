import { useRouter } from "expo-router";
import { Mail } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  return (
    <ScrollView className="flex-1 bg-white px-6 pt-20">
      <View className="mb-8">
        <Text className="text-2xl font-semibold text-center">Esqueceu sua senha?</Text>
        <Text className="text-gray-500 text-center mt-1">
          Insira seu e-mail e enviaremos instruções para redefinir sua senha.
        </Text>
      </View>
      <View className="mb-6">
        <Text className="text-gray-800 mb-1">Email</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3">
          <Mail size={18} color="#9CA3AF" />
          <TextInput
            placeholder="seuemail@exemplo.com.br"
            keyboardType="email-address"
            placeholderTextColor="#9CA3AF"
            className="flex-1 py-3 ml-2 text-gray-800"
          />
        </View>
      </View>
      <TouchableOpacity className="bg-black py-4 rounded-lg mb-4">
        <Text className="text-white text-center font-semibold text-base">
          Enviar instruções
        </Text>
      </TouchableOpacity>
      <View className="flex-row justify-center mt-2">
        <Text className="text-gray-600">Lembrou sua senha? </Text>
        <TouchableOpacity onPress={() => router.push('/Screens/login/loginScreen')}>
          <Text className="text-blue-600 font-semibold">Entrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

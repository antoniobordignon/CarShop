import { useRouter } from "expo-router";
import { Lock, Mail, User } from "lucide-react-native";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen() {
  const router = useRouter();
  
  return (
    <ScrollView className="flex-1 bg-white px-6 pt-20">
      <View className="mb-8">
        <Text className="text-2xl font-semibold text-center">Crie sua conta</Text>
        <Text className="text-gray-500 text-center mt-1">
          Preencha os campos abaixo para se registrar
        </Text>
      </View>
      <View className="mb-4">
        <Text className="text-gray-800 mb-1">Nome</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3">
          <User size={18} color="#9CA3AF" />
          <TextInput
            placeholder="seu nome completo"
            placeholderTextColor="#9CA3AF"
            className="flex-1 py-3 ml-2 text-gray-800"
          />
        </View>
      </View>
      <View className="mb-4">
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
      <View className="mb-4">
        <Text className="text-gray-800 mb-1">Senha</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3">
          <Lock size={18} color="#9CA3AF" />
          <TextInput
            placeholder="crie uma senha"
            secureTextEntry
            placeholderTextColor="#9CA3AF"
            className="flex-1 py-3 ml-2 text-gray-800"
          />
        </View>
      </View>
      <View className="mb-6">
        <Text className="text-gray-800 mb-1">Confirmar Senha</Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg px-3">
          <Lock size={18} color="#9CA3AF" />
          <TextInput
            placeholder="repita sua senha"
            secureTextEntry
            placeholderTextColor="#9CA3AF"
            className="flex-1 py-3 ml-2 text-gray-800"
          />
        </View>
      </View>
      <TouchableOpacity className="bg-black py-4 rounded-lg mb-4">
        <Text className="text-white text-center font-semibold text-base">
          Cadastrar
        </Text>
      </TouchableOpacity>
      <View className="flex-row justify-center mt-2">
        <Text className="text-gray-600">Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => router.push('/Screens/login/loginScreen')}>
          <Text className="text-blue-600 font-semibold">Entrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
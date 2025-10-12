import Button from "@/src/components/button";
import Input from "@/src/components/input";
import { useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const router = useRouter();

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <View className="mb-10">
        <Text className="text-3xl font-bold text-center text-black">
          Bem-vindo
        </Text>
        <Text className="text-gray-500 text-center mt-1">
          Faça login para continuar
        </Text>
      </View>
      <View className="mb-4">
        <Input
          label="Email"
          icon={<Mail size={20} color="#9CA3AF" />}
          placeholder="seuemail@exemplo.com.br"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View className="mb-4">
        <Input
          label="Senha"
          icon={<Lock size={20} color="#9CA3AF" />}
          placeholder="sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity>
          <Text className="text-blue-600 text-sm text-right mt-1">
            Esqueceu a senha?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="bg-black rounded-md py-3 mt-3">
        <Button
          title="Entrar"
          onPress={() => router.push("/Screens/home/homeScreen")}
          
        />
      </TouchableOpacity>
      <View className="mt-6 flex-row justify-center">
        <Text className="text-gray-600">Não tem uma conta? </Text>
        <TouchableOpacity>
          <Text className="text-blue-600 font-medium">Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

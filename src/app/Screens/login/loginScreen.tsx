import Button from "@/src/components/button";
import Input from "@/src/components/input";
import { useAuth } from "@/src/contexts/authContext";
import { syncCars } from "@/src/services/syncService";
import { useRouter } from "expo-router";
import { Lock, User } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

export default function LoginScreen() {
  const [userName, setUserName] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  async function handleLogin() {
    try {
      setLoading(true);

      const success = await signIn(userName, senha);
      console.log(success);

      if (success) {
        try {
          await syncCars();
          router.push("/Screens/home/homeScreen");
        } catch (error) {
          console.log("Erro ao sincronizar carros:", error);
          Alert.alert("Erro ao carregar dados dos carros.");
        }
      } else {
        Alert.alert("Usuário ou senha inválidos.");
      }
    } finally {
      setLoading(false);
    }
  }

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
          label="Usuário"
          icon={<User size={20} color="#9CA3AF" />}
          placeholder="Seu usuário"
          keyboardType="default"
          value={userName}
          onChangeText={setUserName}
        />
      </View>

      <View className="mb-4">
        <Input
          label="Senha"
          icon={<Lock size={20} color="#9CA3AF" />}
          placeholder="Sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <Button title="Entrar" onPress={handleLogin} loading={loading}/>
    </View>
  );
}

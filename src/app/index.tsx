import { AuthProvider } from "@/src/contexts/authContext";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../styles/global.css";
import Login from "./Screens/login/loginScreen";

import { createTables } from "@/src/database/schema";

export default function App() {

  useEffect(() => {
    createTables();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SafeAreaView className="flex-1 bg-white">
          <Login />
        </SafeAreaView>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

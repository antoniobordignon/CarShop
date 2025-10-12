
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "../styles/global.css";
import Login from "./Screens/login/loginScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <Login />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

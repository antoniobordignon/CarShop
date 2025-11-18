import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { api } from "../services/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  loading: boolean;
}

interface User {
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLogoutTimer = () => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(() => {
      console.log("⏰ Sessão expirada. Fazendo logout automático...");
      signOut();
    }, 60 * 60 * 1000);
  };

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("@token");
        const storedUser = await AsyncStorage.getItem("@user");

        if (storedToken) {
          setToken(storedToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        }

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        if (storedToken && storedUser) {
          startLogoutTimer();
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  },);

  async function signIn(username: string, password: string): Promise<boolean> {
    try {
      const response = await api.post("/api/v1/auth/token", {
        username,
        password,
      });

      if (response.status === 200 && response.data?.token) {
        const token = response.data.token;

        await AsyncStorage.setItem("@token", token);
        await AsyncStorage.setItem("@user", JSON.stringify({ username }));

        setUser({ username });
        setToken(token);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        startLogoutTimer();

        return true;
      }
    } catch (error) {
      console.log("Erro ao fazer login:", error);
    }
    return false;
  }

  async function signOut() {
    console.log("🔒 Logout executado");
    await AsyncStorage.removeItem("@token");
    await AsyncStorage.removeItem("@user");
    setUser(null);
    setToken(null);
    delete api.defaults.headers.common["Authorization"];

    if (logoutTimer.current) clearTimeout(logoutTimer.current);
  }

  return (
    <AuthContext.Provider value={{ user, token, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

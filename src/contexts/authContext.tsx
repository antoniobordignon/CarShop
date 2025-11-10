import React, { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
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

  async function signIn(username: string, password: string): Promise<boolean> {
    try {
      const response = await api.post(
        '/api/v1/user/login',
        { username, password }
      );

      if (response.status === 200) {
        setUser({ username });
        return true;
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error);
    }
    return false;
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
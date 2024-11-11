import type { PropsWithChildren } from "react";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface User {
  rut: string;
  phone: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  gender: string;
  email: string;
  account_creation_date: Date;
  can_be_chamber: boolean;
}

interface AuthState {
  user: User;
  token: string;
  mode: "user" | "chamber";
}

interface AuthContextProps {
  authState: AuthState | null;
  loading: boolean;
  firstLoading: boolean;
  login: (user: string, password: string, callback: () => void, mode: "user" | "chamber") => void;
  logout: () => void;
  toggleMode: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: null,
  loading: true,
  firstLoading: true,
  login: () => {},
  logout: () => {},
  toggleMode: () => {}
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstLoading, setFirstLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      const mode = await SecureStore.getItemAsync("mode");
      if (!token) {
        setFirstLoading(false);
        return;
      }
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/me/`, {
          headers: {
            access_token: `${token}`
          }
        });
        if (!response.ok) {
          await SecureStore.deleteItemAsync("token");
          setAuthState(null);
          setFirstLoading(false);
          return;
        }
        const data = await response.json();
        setAuthState({
          token,
          mode: data.can_be_chamber && mode === "chamber" ? "chamber" : "user",
          user: data
        });
      } catch (error) {
        console.log(error);
      } finally {
        setFirstLoading(false);
      }
    })();
  }, []);

  const logout = useCallback(() => {
    setAuthState(null);
    (async () => {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("mode");
    })();
  }, []);

  const toggleMode = useCallback(() => {
    setAuthState(prevState => {
      if (!prevState) {
        return null;
      }
      if (prevState?.user?.can_be_chamber === false) {
        return {
          ...prevState,
          mode: "user"
        };
      }
      if (prevState?.mode === "user") {
        return {
          ...prevState,
          mode: "chamber"
        };
      }
      return {
        ...prevState,
        mode: "user"
      };
    });
    (async () => {
      const mode = await SecureStore.getItemAsync("mode");
      await SecureStore.setItemAsync("mode", mode === "user" && authState?.user?.can_be_chamber ? "chamber" : "user");
    })();
  }, [authState?.user?.can_be_chamber]);

  const login = useCallback((email: string, password: string, callback: () => void, mode: "user" | "chamber" = "user") => {
    setLoading(true);
    const doLogin = async () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login/`, {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        callback();
        setLoading(false);
        return;
      }
      const data = await response.json();
      setAuthState({
        token: data.token.access_token,
        mode: mode,
        user: data.user
      });
      await SecureStore.setItemAsync("mode", mode);
      await SecureStore.setItemAsync("token", data.token.access_token);
      setLoading(false);
    };
    doLogin();
  }, []);

  const values = useMemo(() => ({ authState, loading, login, firstLoading, logout, toggleMode }), [authState, firstLoading, loading, login, logout, toggleMode]);
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

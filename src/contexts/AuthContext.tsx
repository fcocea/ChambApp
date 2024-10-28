import type { PropsWithChildren } from "react";
import { createContext, useEffect, useMemo, useState } from "react";

interface AuthState {
  user: string;
  token: string;
  mode: "user" | "chamber";
}

interface AuthContextProps {
  authState: AuthState | null;
  setAuthState?: any;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: null,
  loading: true
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const values = useMemo(() => ({ authState, setAuthState, loading }), [authState, loading]);
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

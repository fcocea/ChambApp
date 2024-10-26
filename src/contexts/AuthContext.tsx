import type { PropsWithChildren } from "react";
import { createContext, useMemo, useState } from "react";

interface AuthState {
  user: string;
  token: string;
  mode: "user" | "chamber";
}

interface AuthContextProps {
  authState: AuthState | null;
  setAuthState?: any;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: null
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState(null);

  const values = useMemo(() => ({ authState, setAuthState }), [authState]);
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

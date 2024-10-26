import type { PropsWithChildren } from "react";
import { createContext, useMemo, useState } from "react";

interface AuthContextProps {
  authState: any;
  setAuthState?: any;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: null
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const values = useMemo(() => ({ authState, setAuthState }), [authState]);
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

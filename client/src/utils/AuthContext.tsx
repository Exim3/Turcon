import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  exp: number;
}

interface AuthContextType {
  authToken: string | null;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("jwt") || null
  );
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    if (authToken) {
      try {
        const decoded: DecodedToken = jwtDecode(authToken);
        setUser(decoded);
      } catch (e) {
        setAuthToken(null);
        localStorage.removeItem("jwt");
      }
    }
  }, [authToken]);

  const login = (token: string) => {
    setAuthToken(token);
    localStorage.setItem("jwt", token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

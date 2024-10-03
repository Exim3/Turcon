import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "./authUtils";
import { useNavigate } from "react-router";

interface DecodedToken {
  id: string;
  role: string;
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
    localStorage.getItem("adminjwt") || null
  );
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (authToken) {
        try {
          if (isTokenExpired(authToken)) {
            throw new Error("Token expired");
          }
          const decoded: DecodedToken = jwtDecode(authToken);
          setUser(decoded);
        } catch (e) {
          logout();
          navigate("/login", { replace: true });
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, [authToken]);

  const login = (token: string) => {
    try {
      setAuthToken(token);
      localStorage.setItem("adminjwt", token);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const logout = () => {
    try {
      setAuthToken(null);
      localStorage.removeItem("adminjwt");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  if (loading) {
    return <div className="loading-spinner">Loading...</div>; // Or a spinner/loading component
  }

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

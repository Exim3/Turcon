import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthContext";
interface DecodedToken {
  id: string;
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  const decoded: DecodedToken = jwtDecode(token);
  return decoded.exp < Date.now() / 1000;
};

export const handleUnauthorizedError = () => {
  const { logout } = useAuth();

  logout();
  window.location.href = "/login";
};

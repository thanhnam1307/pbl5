import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_SERVER_URI + "/users";

export const useAuth = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      // console.log("API Response:", data); // Log dữ liệu trả về từ API

      if (!response.ok) throw new Error(data.message);

      if (!data.user || typeof data.user !== "object") {
        console.error("Invalid user data received:", data.user);
        throw new Error("Invalid user data");
      }

      login(data.user); // Đảm bảo rằng userData hợp lệ
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loginUser, loading, error };
};

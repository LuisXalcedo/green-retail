import { useState, useEffect } from "react";
import axios from "axios";

function useAuthToken() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/token", {
          token: localStorage.getItem("refreshToken"),
        });
        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        setToken(newToken);
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    const interval = setInterval(refreshToken, 15 * 60 * 1000); // Refresh every 15 minutes
    return () => clearInterval(interval);
  }, []);

  return token;
}

export default useAuthToken;

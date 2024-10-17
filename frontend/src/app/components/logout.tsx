import { useEffect } from "react";
import { useRouter } from "@/navigation";

const Logout: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Remover el JWT del almacenamiento local
    localStorage.removeItem("token");

    // Redirigir al usuario a la página de inicio de sesión
    router.push("/login");
  }, [router]);

  return null;
};

export default Logout;

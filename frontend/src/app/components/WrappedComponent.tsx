import { useEffect } from "react";
import { useRouter } from "@/navigation";
import { ComponentType } from "react";

const withAuth = (WrappedComponent: ComponentType<any>) => {
  const WithAuthComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  WithAuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthComponent;
};

export default withAuth;

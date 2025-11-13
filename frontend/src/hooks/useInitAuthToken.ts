import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { authToken } from "../services/auth.service";

export function useInitAuthToken() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  useEffect(() => {
    const initialToken = async () => {
      try {
        if (!isAuthenticated) return;

        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });

        authToken.save(token);
      } catch (error) {
        console.error("Error getting token", error);
      }
    };

    initialToken();
  }, [getAccessTokenSilently, isAuthenticated]);
}

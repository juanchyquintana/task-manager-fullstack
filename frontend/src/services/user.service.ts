import { isAxiosError } from "axios";
import { api } from "../api/api";
import { useAuth0 } from "@auth0/auth0-react";

type BackendError = {
  message?: string;
  error?: string;
};

export function useUserService() {
  const { user} = useAuth0();

  const registerIfNotExists = async () => {
    if (!user) return;

    const body = {
      auth0Id: user?.sub as string,
      email: user?.email,
      role: "user" as const
    };
    
    try {
      await api.post("/api/users", body);
    } catch (error) {
  if (isAxiosError(error)) {
    if (error.response?.status === 409) {
      console.warn("User already exists, skipping registration.");
      return;
    }

    const message =
      (error.response?.data as BackendError)?.message ||
      "Unexpected error registering user.";

    console.error("USER SERVICE ERROR:", message);
    throw new Error(message);
  }

  throw error;
  }
  };

  return {
    registerIfNotExists,
  };
}

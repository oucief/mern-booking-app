import { LoginFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";

const BASE_API_URL = import.meta.env.VITE_BASE_URL || "";

export const verifyToken = async () => {
  const response = await fetch(`${BASE_API_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token Invalid or Expired");
  }

  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${BASE_API_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const login = async (formData: LoginFormData) => {
  const response = await fetch(`${BASE_API_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const logout = async () => {
  const response = await fetch(`${BASE_API_URL}/api/auth/logout`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to logout");
  }
};

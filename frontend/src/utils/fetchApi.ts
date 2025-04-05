import axios from "axios"; 
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
import type { 
    AuthResponse, 
    ApiResponse, 
    LoginForm, 
    RegisterForm, 
    RegisterResponse,
    User 
} from "./interface";

const API_URL: string = import.meta.env.VITE_API_URL as string;
console.log("Base URL:", API_URL);

const API: AxiosInstance = axios.create({
  baseURL: API_URL,
});

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token: string | null = localStorage.getItem("token");
    console.log("Token:", token);
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export const loginUser = async (formData: LoginForm): Promise<AuthResponse> => {
  try {
    const response = await API.post<ApiResponse>("/login", formData);
    if (response.data.token && response.data.user) {
        return {
          token: response.data.token,
          user: response.data.user
        };
      } else {
        console.error("Invalid API response structure:", response.data);
        throw new Error("Invalid response format from server");
      }
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    throw axiosError.response?.data?.message || "Failed to login";
  }
};

export const registerUser = async (formData: RegisterForm): Promise<RegisterResponse> => {
  try {
    const response = await API.post<RegisterResponse>("/register", formData);
    if (response.data.user) {
        return response.data;
      } else {
        console.error("Invalid API response structure:", response.data);
        throw new Error("Invalid response format from server");
      }
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    throw axiosError.response?.data?.message || "Failed to register";
  }
};

export const getUserProfile = async (): Promise<User | null> => {
    try {
        const response = await API.get<ApiResponse>("/profile/detail");
        if (response.data.user) {
            return response.data.user;
          } else {
            console.error("Invalid profile response:", response.data);
            throw new Error("Failed to fetch user profile");
          }
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        if (axiosError.response) {
            switch (axiosError.response.status) {
              case 401:
                throw new Error("Unauthorized. Please log in again.");
              case 404:
                throw new Error("User profile not found");
              default:
                throw axiosError.response.data?.message || "Failed to fetch user profile";
            }
          } else if (axiosError.request) {
            throw new Error("No response received from server");
          } else {
            throw new Error("Error setting up the request");
          }
    }
}
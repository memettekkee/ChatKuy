export interface ApiResponse {
    status: string;
    message: string;
    user?: User;
    token?: string;
  }

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    avatar: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginForm {
    email: string;
    password: string;
}

export interface RegisterForm {
    name: string;
    avatar?: string;
}

export interface RegisterResponse {
    error: boolean;
    message: string;
    user: User;
  }
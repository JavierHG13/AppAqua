import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "../services/axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

type UserRole = "Cliente" | "Admin";

interface User {
    id: string;
    nombre: string;
    apellidos: string;
    email: string;
    rol: UserRole;
    avatar: {
        public_id: string,
        url: string
    }
}

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (credentials: { email: string; password: string }) => Promise<void>;
    loginOAuth: (accessToken: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    error?: string;
    hasRole: (requiredRole: UserRole) => boolean;
    updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setErrors] = useState<string | undefined>(undefined);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter() 

    // Verificar autenticación al cargar la aplicación
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem("jwt");

                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await api.get("/auth/verify");

                setUser(response.data);
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Función para iniciar sesión
    const login = async (credentials: { email: string; password: string }): Promise<void> => {
        
        setLoading(true);
        try {
            const response = await api.post("/auth/login", credentials);

            const { token, user } = response.data;
            await AsyncStorage.setItem("jwt", token);
            setUser(user);
            setIsAuthenticated(true);

            router.navigate('/dashboard')

            console.log(response.data);
        } catch (err: any) {
            setIsAuthenticated(false);
            setErrors(err.response?.data.message || "Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    };

    // Función para iniciar sesión con Google
    const loginOAuth = async (credential: string): Promise<void> => {
        setLoading(true);
        try {
            const response = await api.post("/auth/google-auth", { googleToken: credential });

            const { token, user } = response.data;
            await AsyncStorage.setItem("jwt", token);
            setUser(user);
            setIsAuthenticated(true);

            router.navigate('/dashboard')

            console.log(response);
        } catch (err: any) {
            setIsAuthenticated(false);
            setErrors(err.response?.data.message || "Error al iniciar sesión con Google");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    // Función para cerrar sesión
    const logout = async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem('jwt');
            setUser(null);
            setIsAuthenticated(false);

            router.navigate('/home')

        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    // Función para verificar roles
    const hasRole = (requiredRole: UserRole): boolean => {
        if (user && typeof user.rol === 'string') {
            return user.rol === requiredRole;
        }

        return false;
    };

    const updateUser = (updatedUser: User) => setUser(updatedUser); // Función para actualizar al usuario fuera de este contexto

    // Limpiar errores después de 5 segundos
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setErrors(undefined);
            }, 5000);

            return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
        }
    }, [error]);

    return (
        <AuthContext.Provider value={{ user, loading, login, loginOAuth, logout, hasRole, error, isAuthenticated, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

export default AuthContext
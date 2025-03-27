import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "../components/Header";
import { AuthProvider, useAuth } from "../context/AuthContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";
import { useRouter } from "expo-router";

function AuthTabs() {
    const { isAuthenticated, user, loading } = useAuth();
    const router = useRouter();

    console.log("Es autenticado:", isAuthenticated);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#1890ff" />
            </View>
        );
    }

    if (!isAuthenticated && router.canGoBack()) {
        router.replace("/auth");
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#1890ff',
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="productos"
                options={{
                    title: 'Productos',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="shopping-bag" color={color} size={size} />
                    ),
                }}
            />


            <Tabs.Screen
                name="carrito"
                options={{
                    href: null,
                    title: 'Carrito',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="shopping-bag" color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="busquedas"
                options={{
                    href: null,
                    title: 'Bus',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="shopping-bag" color={color} size={size} />
                    ),
                }}
            />


            <Tabs.Screen
                name="dashboard"
                options={{
                    href: isAuthenticated ? undefined : null,
                    title: 'Dashboard',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="dashboard" color={color} size={size} />
                    )
                }}
            />
            <Tabs.Screen
                name="perfil"
                options={{
                    href: isAuthenticated ? undefined : null,
                    title: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" color={color} size={size} />
                    )
                }}
            />

            <Tabs.Screen
                name="auth"
                options={{
                    href: isAuthenticated ? null : undefined,
                    title: 'Login',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="sign-in" color={color} size={size} />
                    )
                }}
            />

        </Tabs>
    );
}

export default function LayoutTabs() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <Header />
                <AuthTabs />
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
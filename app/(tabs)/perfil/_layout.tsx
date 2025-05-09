import { Stack } from "expo-router";

export default function PerfilStack() {
    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="index"
                options={{ title: 'Perfil' }}
            />

            <Stack.Screen
                name="editar"
                options={{ title: 'Editar perfil' }}
            />
        </Stack>
    );
}
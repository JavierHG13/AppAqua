import { Stack } from "expo-router";

export default function DashboardStack() {
    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="index"
                options={{ title: 'Inicio' }}
            />

            <Stack.Screen
                name="dispositivo/[id]"
                options={{ title: 'Mi Dasboard' }}
            />

            <Stack.Screen
                name="agregarDispositivo"
                options={{ title: 'Agregar Dispositivo' }}
            />
        </Stack>
    );
}
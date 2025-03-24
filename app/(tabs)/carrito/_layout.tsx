import { Stack } from "expo-router";

export default function  CarritoStack() {
    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="index"
                options={{ title: 'carrito de compras' }}
            />
        </Stack>
    );
}
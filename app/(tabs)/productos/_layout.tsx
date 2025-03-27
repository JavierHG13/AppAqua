import { Stack } from 'expo-router';

export default function ProductosStack() {

    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="index"
                options={{ title: 'Vista productos' }}
            />
            <Stack.Screen
                name="detalles/[id]"
                options={{ title: 'Detalle del producto' }}
            />

            <Stack.Screen
                name="categoria/[categoria]"
                options={{ title: 'Detalle del producto' }}
            />
        </Stack>
    );
}

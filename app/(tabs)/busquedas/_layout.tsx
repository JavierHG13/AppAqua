import { Stack } from "expo-router";

export default function  CarritoStack() {
    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="query/[query]"
                options={{ title: 'Vista de busquedas' }}
            />
        </Stack>
    );
}
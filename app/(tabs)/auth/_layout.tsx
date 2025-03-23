import { Stack } from 'expo-router';

export default function AuthStack() {

    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen
                name="login"
                options={{ title: 'Inicio de sesioón' }}
            />
            <Stack.Screen
                name="registro"
                options={{ title: 'Registro' }}
            />
        </Stack>
    );
}

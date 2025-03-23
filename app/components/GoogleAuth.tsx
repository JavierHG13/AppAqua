/*import React, { useEffect } from 'react';
import { Button, Platform } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from "@react-native-async-storage/async-storage";

const clientId = "274188687279-tndhi3kfbplab1tc9h9fnkvtj7jao73f.apps.googleusercontent.com";

export const GoogleAuth = () => {
    const { loginOAuth } = useAuth();

    // Configuración de la autenticación de Google
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId,
    });

    useEffect(() => {
        if (response?.type === 'success' && response?.params?.id_token) {
            const { id_token } = response.params;
            loginOAuth(id_token);  // Llamada a la función de login con el token de Google
        }
    }, [response]);


    const handleGoogleLogin = async () => {
        await promptAsync();  // Esto abre el modal de inicio de sesión de Google
    };

    return (
        <Button
            title="Iniciar sesión con Google"
            onPress={handleGoogleLogin}
            disabled={!request}
        />
    );
};*/

const GoogleAuth = () => {

  };
  export default GoogleAuth;
  

// Formulario.js
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { FontAwesome } from "@expo/vector-icons"; // Font Awesome para React Native
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";

interface formsData {
  email: string;
  password: string
}

export default function LoginScreen() {

  const { control, handleSubmit, formState: { errors }, clearErrors } = useForm<formsData>();
  const { login, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  const onSubmit = async (values: formsData) => {
    await login(values)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de sesión</Text>

      <View style={styles.formContainer}>

        {/* Campo Correo */}
        <View>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="#666" style={styles.icon} />
            <Controller
              control={control}
              name="email"
              rules={{
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresa un correo válido",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Correo electrónico"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                />
              )}
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        </View>


        {/* Campo Contraseña */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#666" style={styles.icon} />
          <Controller
            control={control}
            name="password"
            rules={{
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={value}
                onChangeText={onChange}
              />
            )}
          />
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

        {/* Botón de envío */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity onPress={() => router.push('/auth/registro')}>
        <Text style={styles.link}>¿No tienes cuenta? Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    width: '100%',
    maxWidth: 400, // Asegura que no se estire mucho en pantallas grandes
    minHeight: 270,
    padding: 20,
    justifyContent: "space-around",
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#40a9ff',
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  link: {
    marginTop: 10,
    color: '#40a9ff',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';

interface formData {
  nombre: string;
  apellidos: string;
  telefono: string;
  correo: string;
  password: string;
  confirmPassword: string;
  palabraSecreta: string;
}

const RegistroScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { control, handleSubmit, formState: { errors }, clearErrors, watch } = useForm<formData>();

  const password = watch("password"); //Con watch verificamos que las contraseñas coincidan

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        clearErrors();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors, clearErrors]);

  const onSubmit = async (values: formData) => {
    console.log(values)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registro</Text>

      <View style={styles.formContainer}>
        {/* Campo Nombre */}
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" size={20} color="#666" style={styles.icon} />
            <Controller
              control={control}
              name="nombre"
              rules={{
                required: "El nombre es obligatorio",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres"
                }
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Nombre"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.nombre && <Text style={styles.errorText}>{errors.nombre.message}</Text>}
        </View>

        {/* Campo Apellidos */}
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <FontAwesome name="users" size={20} color="#666" style={styles.icon} />
            <Controller
              control={control}
              name="apellidos"
              rules={{
                required: "Los apellidos son obligatorios",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Apellidos"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.apellidos && <Text style={styles.errorText}>{errors.apellidos.message}</Text>}
        </View>

        {/* Campo Teléfono */}
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <FontAwesome name="phone" size={20} color="#666" style={styles.icon} />
            <Controller
              control={control}
              name="telefono"
              rules={{
                required: "El teléfono es obligatorio",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Ingresa solo números"
                }
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Teléfono"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                />
              )}
            />
          </View>
          {errors.telefono && <Text style={styles.errorText}>{errors.telefono.message}</Text>}
        </View>

        {/* Campo Correo */}
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="#666" style={styles.icon} />
            <Controller
              control={control}
              name="correo"
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
          {errors.correo && <Text style={styles.errorText}>{errors.correo.message}</Text>}
        </View>

        {/* Campo Contraseña */}
        <View style={styles.inputGroup}>
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
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </View>

        {/* Campo Confirmar Contraseña */}
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" size={20} color="#666" style={styles.icon} />
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Confirma tu contraseña",
                validate: value =>
                  value === password || "Las contraseñas no coinciden"
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar contraseña"
                  secureTextEntry={!showConfirmPassword}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialIcons
                name={showConfirmPassword ? "visibility" : "visibility-off"}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
        </View>


        {/* Campo Palabra Secreta */}
        <View style={styles.inputGroup}>
          <View style={styles.inputContainer}>
            <FontAwesome name="key" size={20} color="#666" style={styles.icon} />
            <Controller
              control={control}
              name="palabraSecreta"
              rules={{
                required: "La palabra secreta es obligatoria",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Palabra secreta"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>
          {errors.palabraSecreta && <Text style={styles.errorText}>{errors.palabraSecreta.message}</Text>}
        </View>

        {/* Botón de envío */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => console.log('Ir a Login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Iniciar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegistroScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    minHeight: 'auto',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#40a9ff',
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  link: {
    marginTop: 20,
    color: '#40a9ff',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
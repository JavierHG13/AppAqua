import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { useForm, Controller } from "react-hook-form";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/axios';

interface User {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  avatar: {
    public_id: string;
    url: string;
  };
}

interface PasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function EditarPerfilScreen() {
  const { user, logout } = useAuth();
  const [image, setImage] = useState(user?.avatar?.url || '');
  const { control, handleSubmit, setError, formState: { errors } } = useForm<PasswordFormData>({
    defaultValues: { newPassword: '', confirmPassword: '' }
  });

  const handleUpdateAvatar = async () => {
    try {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!pickerResult.canceled && pickerResult.assets[0].uri) {
        const localUri = pickerResult.assets[0].uri;
        setImage(localUri);

        const formData = new FormData();

        formData.append("avatar", {
          uri: localUri,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        });

        const response = await fetch('/user/avatar', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          Alert.alert("Éxito", "Imagen de perfil actualizada");
        } else {
          Alert.alert("Error", result.message || "No se pudo actualizar la imagen");
        }
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo seleccionar la imagen");
      console.error("Error al seleccionar la imagen:", error);
    }
  };

  const onSubmitPassword = async (data: PasswordFormData) => {
    if (data.newPassword.length < 6) {
      setError("newPassword", { message: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", { message: "Las contraseñas no coinciden" });
      return;
    }

    try {
      const response = await api.post('/user/updatePassword',  {"newPassword":data.newPassword})
      console.log(response)
      logout();
      Alert.alert("Éxito", "Contraseña actualizada correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar la contraseña");
      console.error("Error al actualizar contraseña:", error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: image || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <Button title="Actualizar imagen de perfil" onPress={handleUpdateAvatar} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información personal</Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={user?.nombre} editable={false} />
        <Text style={styles.label}>Apellidos</Text>
        <TextInput style={styles.input} value={user?.apellidos} editable={false} />
        <Text style={styles.label}>Correo electrónico</Text>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cambiar contraseña</Text>

        <Text style={styles.label}>Nueva contraseña</Text>
        <Controller
          control={control}
          name="newPassword"
          rules={{ required: "Este campo es obligatorio", minLength: { value: 6, message: "Mínimo 6 caracteres" } }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Nueva contraseña"
              secureTextEntry
            />
          )}
        />
        {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword.message}</Text>}

        <Text style={styles.label}>Confirmar contraseña</Text>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{ required: "Este campo es obligatorio" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              placeholder="Confirmar contraseña"
              secureTextEntry
            />
          )}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit(onSubmitPassword)}>
        <Text style={styles.saveButtonText}>Actualizar contraseña</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#6BB1FF',
    marginBottom: 15,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  emailText: {
    fontSize: 16,
    color: "#34495e",
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: '#6BB1FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

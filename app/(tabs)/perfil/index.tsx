import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface UserData {
  nombre: string;
  apellido?: string;
  email: string;
  avatar?: {
    url: string;
  };
}


export default function PerfilScreen() {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter()


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {(user?.avatar?.url) && (
          <Image
            source={{ uri: user?.avatar?.url || '' }}
            style={styles.avatar}
          />
        )}


        <Text style={styles.welcomeText}>
          ¡Bienvenido, {user?.nombre} {user?.apellidos}!
        </Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => { router.push('/perfil/editar')}}
        >
          <Ionicons
            name={"pencil"}
            size={24}
            color="#6BB1FF"
          />
        </TouchableOpacity>


        <View style={styles.infoContainer}>
          <Text style={styles.label}>Correo electrónico:</Text>

          <Text style={styles.infoText}>{user?.email}</Text>

        </View>


        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={logout}
        >
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    position: 'relative',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 10,
    borderWidth: 3,
    borderColor: '#6BB1FF',
  },
  infoContainer: {
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 5,
    fontWeight: '500',
  },
  infoText: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  nameInput: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  infoInput: {
    fontSize: 16,
  },
  editButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    padding: 8,
    backgroundColor: '#f0f8ff',
    borderRadius: 20,
  },
  buttonsContainer: {
    marginTop: 'auto',
    marginBottom: 20,
    gap: 10,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
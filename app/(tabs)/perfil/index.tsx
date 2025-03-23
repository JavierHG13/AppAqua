import React from 'react';
import { useAuth } from "../../context/AuthContext";
import { View, Text, Button, StyleSheet, Image } from "react-native";

export default function PerfilScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Bienvenido, {user?.nombre}!</Text>
        {user?.avatar && (
          <Image
            source={{ uri: user.avatar.url }}
            style={styles.avatar}
          />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Correo: {user?.email}</Text>
      </View>

      <Button title="Cerrar sesión" onPress={logout} color="#e74c3c" />
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
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 30,
  },
  infoText: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 5,
  },
});

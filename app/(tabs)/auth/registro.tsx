import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

const RegistroScreen = () => {
  
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    console.log('Registrarse', { nombre, apellido, telefono, correo, password });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registro</Text>
      <View style={styles.formContainer}>
        <Text style={styles.subtitulo}>Nombre</Text>
        <TextInput
          placeholder='Nombre'
          style={styles.input}
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />

        <Text style={styles.subtitulo}>Apellido</Text>
        <TextInput
          placeholder='Apellido'
          style={styles.input}
          value={apellido}
          onChangeText={(text) => setApellido(text)}
        />

        <Text style={styles.subtitulo}>Teléfono</Text>
        <TextInput
          placeholder='Teléfono'
          style={styles.input}
          value={telefono}
          onChangeText={(text) => setTelefono(text)}
          keyboardType="phone-pad"
        />

        <Text style={styles.subtitulo}>Correo</Text>
        <TextInput
          placeholder='Correo'
          keyboardType='email-address'
          style={styles.input}
          value={correo}
          onChangeText={(text) => setCorreo(text)}
        />

        <Text style={styles.subtitulo}>Contraseña</Text>
        <TextInput
          placeholder='Contraseña'
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
    alignItems: 'stretch', // Hace que los elementos ocupen el 100% del ancho disponible
    padding: 20,
    backgroundColor: '#f5f5f5', // Fondo suave
  },
  titulo: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 24,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400, // Asegura que no se estire mucho en pantallas grandes
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    marginBottom: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
    width: '100%', // Asegura que los inputs ocupen el ancho completo disponible
  },
  button: {
    backgroundColor: '#40a9ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    width: '100%', // Asegura que el botón ocupe todo el ancho disponible
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    marginTop: 10,
    color: '#40a9ff',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

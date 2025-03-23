import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispositivos } from '../../hooks/useDispositivos';
import { useAuth } from '../../context/AuthContext';

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import { ScreensList } from '../../navigation/types';

const AgregarDispositivo = () => {
    const { user } = useAuth();
    const { asignarDispositivo, loading } = useDispositivos();
    
    const [nombrePersonalizado, setNombrePersonalizado] = useState('');
    const [macAddress, setMacAddress] = useState('');
    const [error, setError] = useState('');
     const navigation = useNavigation<NativeStackNavigationProp<ScreensList>>();

    const handleAddDevice = async () => {
        if (!user || !user.id) return;
        if (!nombrePersonalizado || !macAddress) {
            setError('Todos los campos son obligatorios');
            return;
        }
        setError('');
        const deviceData = { nombrePersonalizado, macAddress, usuarioId: user.id };
        await asignarDispositivo(deviceData);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar Dispositivo</Text>
            
            <TextInput
                placeholder="Nombre del dispositivo"
                value={nombrePersonalizado}
                onChangeText={setNombrePersonalizado}
                style={styles.input}
            />
            
            <TextInput
                placeholder="Código del dispositivo"
                value={macAddress}
                onChangeText={setMacAddress}
                style={styles.input}
            />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <TouchableOpacity style={styles.button} onPress={handleAddDevice} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Agregar Dispositivo</Text>}
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AgregarDispositivo;

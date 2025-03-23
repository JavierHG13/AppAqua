import { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader';
import { ScreensList } from '../../navigation/types';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/axios';


interface Dispositivos {
    _id: string;
    macAddress: string;
    nombre: string;
    tipo: string;
    estado?: string;
}

const Inicio: React.FC = () => {
    const [dispositivos, setDispositivos] = useState<Dispositivos[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<NativeStackNavigationProp<ScreensList>>();
    const { user } = useAuth();

    // Obtener todos los dispositivos pertenecientes a un solo usuario
    useEffect(() => {
        const obtenerDispositivos = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/dispositivos/${user?.id}`);
                const data = response.data;
                console.log(data)
                setDispositivos(data);
            } catch (error) {
                console.error("Error al obtener dispositivos", error);
            } finally {
                setLoading(false);
            }
        };

        obtenerDispositivos();
    }, [user?.id]);


    if (loading) {
        return <Loader />;
    }


    return (
        <View style={styles.inicioContainer}>
            <ScrollView contentContainerStyle={styles.gridContainer}>
                {dispositivos.map((dispositivo) => (
                    <TouchableOpacity
                        key={dispositivo._id}
                        style={styles.deviceCard}
                        onPress={() => navigation.navigate('DashboardScreen', { id: dispositivo._id })}
                    >
                        <MaterialIcons name="waves" size={32} color="#000" />
                        <Text style={styles.deviceTitle}>{dispositivo.nombre}</Text>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity
                    style={styles.addCard}
                    onPress={() => navigation.navigate("AgregarDispositivo")}
                >
                    <AntDesign name="pluscircleo" size={32} color="#888" />
                    <Text style={styles.deviceTitle}>Agregar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Inicio;

const styles = StyleSheet.create({
    inicioContainer: {
        flex: 1,
        padding: 20,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    deviceCard: {
        width: '48%', // Dos columnas
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Para Android
    },
    deviceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    deviceType: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    addCard: {
        width: '48%', // Dos columnas
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        marginBottom: 16,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#d9d9d9',
        borderRadius: 8,
    },
});
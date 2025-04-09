import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Loader from '../../../components/Loader';
import api from '../../../services/axios';
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
interface Datos {
    _id: string;
    macAddress: string;
    nombre: string;
    tipo: string;
    usuario: null;
    estadoConexion: boolean;
    mediciones: [
        {
            temperatura: number;
            ppm: number; // Partes por millón
            calidadAgua: string; // Buena, Excelente, Óptima, Necesita Cambio
            comidaRestante: number;
            EstadoBomba: number;
            EstadoRestante: string,
            fecha: string;
        }
    ];
}

export default function DsipositivoDashboard() {

    const route = useRoute();
    const { id } = useLocalSearchParams();
    const [datos, setDatos] = useState<Datos>();
    const [conectado, setConectado] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const encenderAlimentador = async (mac: string) => {
        try {
            const response = await api.post(`/dispositivo/encender-alimentador/${mac}`);
            const data = response.data;
            console.log(data.message);
        } catch (error) {
            console.error("Error al encender el alimentador:", error);
        }
    };

    const encenderBombaDeAire = async (mac: string) => {
        try {
            const response = await api.post(`/dispositivo/encender-bomba-aire/${mac}`);
            const data = response.data;
            console.log(data.message);
        } catch (error) {
            console.error("Error al encender la bomba de aire:", error);
        }
    };

    const apagarBombaDeAire = async (mac: string) => {
        try {
            const response = await api.post(`/dispositivo/apagar-bomba-aire/${mac}`);
            const data = response.data;
            //console.log(data.message);
        } catch (error) {
            console.error("Error al apagar la bomba de aire:", error);
        }
    };

    const obtenerDatos = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/dispositivos/datos/${id}`);
            const data = response.data;
            setDatos(data);
            setConectado(data.estadoConexion);
        } catch (error) {
            console.error("Error al obtener dispositivos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerDatos();
        const intervalId = setInterval(obtenerDatos, 3000);

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [id]);

    return (
        <ScrollView contentContainerStyle={styles.dashboardContainer}>
            <Text style={styles.dashboardTitle}>Dashboard {datos?.nombre}</Text>

            <View style={styles.fullWidth}>
                <View style={styles.connectionCard}>
                    <Text style={styles.cardHeader}>Estado de Conexión</Text>
                    <View style={styles.cardBody}>
                        <Text>
                            Estado: <View style={[styles.connectionStatus, conectado ? styles.connected : styles.disconnected]} />
                            {conectado ? "Conectado" : "Desconectado"}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.dashboardRow}>
                <View style={styles.dashboardCol}>
                    <View style={[styles.dashboardCard, (!conectado || (datos?.mediciones[0].comidaRestante ?? 0) <= 0) && styles.disabled]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardTitle}>
                                <Text style={[styles.cardIcon, styles.foodIcon]}>☕</Text>
                                <Text>Comida Restante</Text>
                            </View>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardStatistic}>
                                {datos?.mediciones[0].EstadoRestante ?? "Vacio"}
                                <Text style={styles.suffix}></Text>
                            </Text>

                            <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => datos?.macAddress && encenderAlimentador(datos.macAddress)}
                                disabled={(datos?.mediciones[0].comidaRestante ?? 0) <= 0 || !conectado}
                            >
                                <Text style={styles.buttonText}>Dispensar Comida</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.dashboardCol}>
                    <View style={[styles.dashboardCard, !conectado && styles.disabled]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardTitle}>
                                <Text style={[styles.cardIcon, styles.waterIcon]}><FontAwesome name="tint" size={22} /></Text>
                                <Text>Calidad del Agua</Text>
                            </View>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardStatistic}>
                                {datos?.mediciones[0].ppm ?? 0}
                                <Text style={styles.suffix}>PPM</Text>
                            </Text>
                            <View style={styles.progressContainer}>
                                <View
                                    style={[
                                        styles.progressBar,
                                        datos?.mediciones[0].calidadAgua === "Excelente" ||
                                            datos?.mediciones[0].calidadAgua === "Buena"
                                            ? styles.success
                                            : datos?.mediciones[0].calidadAgua === "Aceptable"
                                                ? styles.warning
                                                : styles.exception,
                                        { width: `${100 - (datos?.mediciones[0].ppm ?? 0) / 10}%` },
                                    ]}
                                />
                            </View>
                            <View style={styles.cardStatus}>
                                <Text
                                    style={[
                                        styles.statusBadge,
                                        datos?.mediciones[0].calidadAgua === "Excelente" ||
                                            datos?.mediciones[0].calidadAgua === "Buena"
                                            ? styles.success
                                            : datos?.mediciones[0].calidadAgua === "Aceptable"
                                                ? styles.warning
                                                : styles.exception,
                                    ]}
                                >
                                    {datos?.mediciones[0].calidadAgua}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.dashboardCol}>
                    <View style={[styles.dashboardCard, !conectado && styles.disabled]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardTitle}>
                            <Text style={[styles.cardIcon, styles.temperatureIcon]}><FontAwesome name="thermometer-half" size={22} /></Text><Text>Temperatura</Text>
                            </View>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardStatistic}>
                                {datos?.mediciones[0].temperatura ?? 0}
                                <Text style={styles.suffix}>°C</Text>
                            </Text>
                            <View style={styles.progressContainer}>
                                <View
                                    style={[
                                        styles.progressBar,
                                        (datos?.mediciones[0].temperatura ?? 0) < 22
                                            ? styles.exception
                                            : (datos?.mediciones[0].temperatura ?? 0) > 26
                                                ? styles.warning
                                                : styles.success,
                                    ]}
                                />
                            </View>
                            <Text style={styles.cardStatus}>
                                {(datos?.mediciones[0].temperatura ?? 0) < 22 ? "Baja"
                                    : (datos?.mediciones[0].temperatura ?? 0) > 26 ? "Alta"
                                        : "Óptima"}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.dashboardCol}>
                    <View style={[styles.dashboardCard, !conectado && styles.disabled]}>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardTitle}>
                            <MaterialCommunityIcons name="fan" size={22} color="#fa8c16" />
                                <Text>Bomba de aire</Text>
                            </View>
                        </View>
                        <View style={styles.cardContent}>

                            <Text style={styles.cardStatistic}>
                                <Text style={styles.suffix}>{datos?.mediciones[0].EstadoBomba == 0 ? "Apagado" : "Encendido"}</Text>
                            </Text>

                            {datos?.mediciones[0].EstadoBomba === 1 ? (
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => datos?.macAddress && apagarBombaDeAire(datos.macAddress)}
                                    disabled={!conectado}
                                >
                                    <Text style={styles.buttonText}>Apagar</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => datos?.macAddress && encenderBombaDeAire(datos.macAddress)}
                                    disabled={!conectado}
                                >
                                    <Text style={styles.buttonText}>Encender</Text>
                                </TouchableOpacity>
                            )}

                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    dashboardContainer: {
        padding: 24,
        backgroundColor: '#f5f7fa',
    },
    dashboardTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '#333',
        marginBottom: 24,
    },
    fullWidth: {
        width: '100%',
    },
    connectionCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#fafafa',
    },
    cardBody: {
        padding: 20,
    },
    connectionStatus: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 10,
    },
    connected: {
        backgroundColor: '#52c41a',
    },
    disconnected: {
        backgroundColor: '#f5222d',
    },
    dashboardRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    dashboardCol: {
        flex: 1,
        minWidth: 300,
    },
    dashboardCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    cardTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIcon: {
        fontSize: 22,
        marginRight: 12,
    },
    foodIcon: {
        color: '#722ed1',
    },
    waterIcon: {
        color: '#1890ff',
    },
    temperatureIcon: {
        color: '#fa8c16',
    },
    cardContent: {
        padding: 20,
    },
    cardStatistic: {
        fontSize: 36,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    suffix: {
        fontSize: 18,
        color: '#999',
    },
    progressContainer: {
        height: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 6,
        marginBottom: 20,
    },
    progressBar: {
        height: '100%',
        borderRadius: 6,
    },
    success: {
        backgroundColor: '#52c41a',
    },
    warning: {
        backgroundColor: '#faad14',
    },
    exception: {
        backgroundColor: '#f5222d',
    },
    cardStatus: {
        textAlign: 'center',
        marginBottom: 20,
    },
    statusBadge: {
        padding: 6,
        borderRadius: 20,
        fontSize: 14,
        fontWeight: '500',
    },
    actionButton: {
        backgroundColor: '#1890ff',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    disabled: {
        opacity: 0.6,
    },
});

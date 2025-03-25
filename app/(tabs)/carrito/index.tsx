import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from '@expo/vector-icons'; // Font Awesome para íconos
import { useFocusEffect } from "@react-navigation/native";
import { useNavigationState } from "@react-navigation/native";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { useRouter } from "expo-router";

export default function CarritoScreen() {
    const [carrito, setCarrito] = useState<any[]>([]);
    const router = useRouter()
    
    useFocusEffect(
        React.useCallback(() => {
            const obtenerCarrito = async () => {
                try {
                    const carritoGuardado = await AsyncStorage.getItem("carrito");

                    if (carritoGuardado) {
                        setCarrito(JSON.parse(carritoGuardado));
                    }
                } catch (error) {
                    console.log("Error al obtener el carrito", error);
                }
            };
            obtenerCarrito();
        }, [])
    );
    const routeHistory = useNavigationState((state) => state.routes);

    // Eliminar un producto del carrito (opcional)
    const eliminarProducto = async (id: string) => {
        const nuevoCarrito = carrito.filter(producto => producto._id !== id);
        setCarrito(nuevoCarrito);
        await AsyncStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    };


    // Renderizado de cada producto en el carrito
    const renderProducto = ({ item }: { item: any }) => {
        return (
            <View style={styles.card}>
                <Image source={{ uri: item.imagen[0]?.url }} style={styles.image} />
                <View style={styles.infoContainer}>
                    <Text style={styles.nombre}>{item.nombre}</Text>
                    <Text style={styles.precio}>${item.precio} USD</Text>
                    <Text style={styles.descripcion}>{item.descripcion}</Text>
                </View>
                <FontAwesome name="trash" size={24} color="red" onPress={() => eliminarProducto(item._id)} />
            </View>
        );
    };


    return (


        <View style={styles.container}>

            <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                    <TouchableOpacity onPress={() => { router.navigate("/productos") }}>
                        <Text style={{ color: "blue" }}>Productos</Text>
                    </TouchableOpacity>
                    
                    <Text style={{ marginHorizontal: 5 }}> / </Text>
                    <Text style={{ color: "gray" }}>Carrito</Text>
                </View>
            </View>


            {carrito.length > 0 ? (
                <FlatList
                    data={carrito}
                    keyExtractor={(item) => item._id}
                    renderItem={renderProducto}
                />
            ) : (
                <Text style={styles.empty}>Tu carrito está vacío</Text>
            )}
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 10,
    },
    nombre: {
        fontSize: 16,
        fontWeight: "bold",
    },
    precio: {
        fontSize: 14,
        color: "green",
    },
    descripcion: {
        fontSize: 12,
        color: "#555",
    },
    empty: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
        color: "#888",
    },
});

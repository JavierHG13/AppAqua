import useProducts from '../../../hooks/useProducts';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../context/AuthContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

interface Product {
    _id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    categoria: string;
    imagen: { public_id: string; url: string }[];
    disponible: boolean;
}

const { width } = Dimensions.get('window');

const DetallesScreen = () => {
    const router = useRouter();
    const { getProductById, loading, error } = useProducts();
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = useLocalSearchParams();
    const { isAuthenticated } = useAuth()
    const [selectImage, setSelectImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const response = await getProductById(id as string);

                if (response) {
                    setProduct(response);
                    setSelectImage(response.imagen[0]?.url);
                }
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <Loader />
    }



    const guardarCarrito = async (carrito: Product) => {
        if (isAuthenticated) {
            try {
                //await AsyncStorage.removeItem('carrito');
                const carritoGuardado = await AsyncStorage.getItem("carrito");  // Obtener el carrito existente de AsyncStorage

                let carritoArray = carritoGuardado ? JSON.parse(carritoGuardado) : [];

                carritoArray.push(carrito);

                await AsyncStorage.setItem("carrito", JSON.stringify(carritoArray));
                router.navigate('/carrito')

            } catch (error) {
                console.log("Error al guardar el carrito", error);
            }
        } else {
            router.navigate("/auth/login")
        }
    };

    const cargarDetalles = () => {
        return (
            <ScrollView style={styles.scrollContainer}>

                <View style={{ flexDirection: "row", paddingBottom: 20, marginTop: -10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>

                        <TouchableOpacity onPress={() => { router.navigate("/productos") }}>
                            <Text style={{ color: "blue" }}>Productos</Text>
                        </TouchableOpacity>

                        <Text style={{ marginHorizontal: 5 }}> / </Text>

                        <TouchableOpacity onPress={() => { router.navigate("/productos") }}>
                            <Text style={{ color: "gray" }}>{product?.categoria}</Text>
                        </TouchableOpacity>

                    </View>
                </View>


                <Text style={styles.title}>{product?.nombre}</Text>


                <View style={styles.imageContainer}>
                    <Image source={{ uri: selectImage }} style={styles.image} />
                </View>

                <View style={styles.thumbnailContainer}>
                    {product?.imagen.map((img, index) => (
                        <TouchableOpacity key={index} onPress={() => setSelectImage(img.url)}>
                            <Image
                                source={{ uri: img.url }}
                                style={[
                                    styles.thumbnail,
                                    selectImage === img.url && styles.selectedThumbnail,
                                ]}
                            />
                        </TouchableOpacity>
                    ))}
                </View>


                <Text style={styles.description}>{product?.descripcion}</Text>
                <Text style={styles.price}>Precio: ${product?.precio}</Text>
                <Text style={styles.stock}>Stock: {product?.stock}</Text>
                <Text style={[styles.status, product?.disponible ? styles.inStock : styles.outOfStock]}>
                    {product?.disponible ? 'Disponible' : 'No disponible'}
                </Text>

                <TouchableOpacity style={styles.button} onPress={() => { guardarCarrito(product) }}>
                    <FontAwesome name="shopping-cart" size={20} color="white" style={styles.icon} />
                    <Text style={styles.buttonText}>Agregar al carrito</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => { guardarCarrito(product) }}>
                    <Text style={styles.buttonText}>Comprar</Text>
                </TouchableOpacity>


            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            {loading ? <Loader /> : cargarDetalles()}
        </View>
    );
};

export default DetallesScreen;

const styles = StyleSheet.create({
    /*container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f8f8",
    },*/
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
    },
    scrollContainer: {
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',  // Asegura que la imagen se recorte dentro del borde redondeado
        marginBottom: 20,
    },
    image: {
        width: width,
        height: 300,
        borderRadius: 10,  // Asegúrate de que la imagen también tenga un borderRadius
    },
    thumbnailContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 20,
    },
    thumbnail: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: "transparent",
    },
    selectedThumbnail: {
        borderColor: "black",
    },


    description: {
        fontSize: 16,
        color: "#666",
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        marginBottom: 10,
    },
    stock: {
        fontSize: 16,
        color: "#888",
        marginBottom: 10,
    },
    status: {
        fontWeight: "bold",
        marginTop: 10,
    },
    inStock: {
        color: "green",
        marginBottom: 10,
    },
    outOfStock: {
        color: "red",
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#40a9ff',
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        flexDirection: "row", // Asegura que el ícono y el texto estén alineados horizontalmente
        justifyContent: 'center', // Centra el contenido en el botón
        marginBottom: 20,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
});
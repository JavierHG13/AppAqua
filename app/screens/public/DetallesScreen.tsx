import { useProducts } from '../../hooks/useProducts';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import Loader from '../../components/Loader';

type RouteParams = {
    id: string;
};

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
    const route = useRoute();
    const { getProductById, loading, error } = useProducts();
    const [product, setProduct] = useState<Product | null>(null);
    const { id } = route.params;

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const response = await getProductById(id as string);
                setProduct(response);
            }
        };
        fetchProduct();
    }, [id]);

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Producto no encontrado</Text>
            </View>
        );
    }

    const cargarDetalles = () => {
        return (
            <ScrollView style={styles.container}>
                
                <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                    {product.imagen.map((img, index) => (
                        <Image
                            key={index}
                            source={{ uri: img.url }}
                            style={styles.image}
                        />
                    ))}
                </ScrollView>
                <Text style={styles.title}>{product.nombre}</Text>
                <Text style={styles.description}>{product.descripcion}</Text>
                <Text style={styles.price}>Precio: €{product.precio}</Text>
                <Text style={styles.stock}>Stock: {product.stock}</Text>
                <Text style={[styles.status, product.disponible ? styles.inStock : styles.outOfStock]}>
                    {product.disponible ? 'Disponible' : 'No disponible'}
                </Text>
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
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffff',
    },
    image: {
        width: width - 40,
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        color: '#6200EE',
        marginBottom: 10,
    },
    stock: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    status: {
        fontWeight: 'bold',
        marginTop: 10,
    },
    inStock: {
        color: 'green',
    },
    outOfStock: {
        color: 'red',
    },
    error: {
        color: 'red',
        fontSize: 18,
    }
});
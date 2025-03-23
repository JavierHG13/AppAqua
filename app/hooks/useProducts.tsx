import React, { useState, useEffect } from 'react';
import api from '../services/axios';

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


// Hook para obtener productos
const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //Cargar todos los productos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get<Product[]>('/productos');

                setProducts(data);
            } catch (err) {
                console.error('Error al cargar los productos:', err);
                setError('Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Obtener un producto por ID
    const getProductById = async (id: string): Promise<Product | null> => {
        try {
            const { data } = await api.get<Product>(`/productos/${id}`);
            return data;
        } catch (err) {
            console.error("Error al cargar el producto:", err);
            setError('Producto no encontrado');
            return null;
        }
    };

    return { products, loading, error, getProductById };
};

export default useProducts
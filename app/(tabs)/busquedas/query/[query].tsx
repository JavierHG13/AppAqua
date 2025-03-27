import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View, Button } from 'react-native';
import Loader from '../../../components/Loader';
import CardProductos from '../../../components/CardProductos';
import api from '../../../services/axios';

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

const ITEMS_PER_PAGE = 20; // 20 productos por página

const ProductosScreen: React.FC = () => {
  const { query } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // Página actual
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        // Realizamos la llamada a la API
        const response = await api.get<Product[]>(`/productos/buscar/${query}`);

        // Verificar la estructura de la respuesta
        console.log("Datos de la respuesta completa:", response.data);  // Aquí ya podemos ver los datos de la respuesta

        // Extraer los productos desde el campo 'results'
        const data = response.data.results;

        console.log("Productos obtenidos:", data);

        setProducts(data);

        setCurrentPage(0);
      } catch (err) {
        console.error('Error al cargar los productos:', err);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]); 


  // Verificar si hay productos antes de paginar
  if (!products) {
    return (
      <View style={styles.container}>
        <Text>No se encontraron productos para: {query}</Text>
      </View>
    );
  }



  const screenLoad = () => {
    return (
      <View style={styles.content}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <CardProductos
              _id={item._id}
              nombre={item.nombre}
              descripcion={item.descripcion}
              precio={item.precio}
              imagen={item.imagen[0].url}
              disponible={item.disponible}
            />
          )}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Resultados para: {query}</Text>

      {loading ? <Loader /> : screenLoad()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    width: '100%',
  },
  listContainer: {
    paddingBottom: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductosScreen;

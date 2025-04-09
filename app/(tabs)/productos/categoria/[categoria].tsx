// src/screens/ClimaView.tsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { FlatList, StyleSheet, Text, View, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useProducts from '../../../hooks/useProducts';
import Loader from '../../../components/Loader';
import CardProductos from '../../../components/CardProductos';
import api from '../../../services/axios';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
interface Product {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: string;
  imagen?: { public_id: string; url: string }[];
  disponible: boolean;
}


const ProductosScreen: React.FC = () => {

  const [categorias, setCategorias] = useState(["Filtros", "Peceras", "Alimentos", "Iluminación", "Automatización", "'Decoración"]);
  const [precio, setPrecio] = useState('')
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { categoria } = useLocalSearchParams()
  const Router = useRouter()


  // useEffect: realizar la búsqueda de productos cuando cambian categoria o precio
  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {

        let endpoint = `/productos/categoria/${categoria}`;

        const { data } = await api.get<Product[]>(endpoint);
        setProducts(data); // Establecer los productos obtenidos
      } catch (err) {
        console.error('Error al cargar los productos:', err);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoria, precio]); // Dependencias de categoria y precio



  const screenLoad = () => {
    return (
      <View style={styles.content}>

        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>

            <TouchableOpacity onPress={() => { Router.replace("/productos") }}>
              <Text style={{ color: "blue" }}>Productos</Text>
            </TouchableOpacity>

            <Text style={{ marginHorizontal: 5 }}> / </Text>
            <Text style={{ color: "gray" }}>{categoria}</Text>
          </View>
        </View>


        <FlatList
          data={products}
          renderItem={({ item }) => (
            <CardProductos
              _id={item._id}
              nombre={item.nombre}
              descripcion={item.descripcion}
              precio={item.precio}
              imagen={item.imagen?.[0]?.url || ''}
              disponible={item.disponible}
            />
          )}

          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />

      </View>
    )
  }

  return (
    <View style={styles.container}>

      {loading ? <Loader /> : screenLoad()}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  content: {
    width: '100%',
  },
  listContainer: {
    paddingBottom: 20,
  }
  ,
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectContainer: {
    marginBottom: 10,
    flexDirection: "row"
  },
  picker: {
    height: 50,
    width: '50%',
  },
});

export default ProductosScreen
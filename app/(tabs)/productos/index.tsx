import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import Loader from '../../components/Loader';
import CardProductos from '../../components/CardProductos';
import api from '../../services/axios';

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

const ITEMS_PER_PAGE = 10;

const ProductosScreen: React.FC = () => {
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState(["Filtros", "Peceras", "Alimentos", "Iluminación", "Automatización", "Decoración"]);
  const [precio, setPrecio] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setCategoria('');
      setPrecio('');
    }, [])
  );
  

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        let endpoint = '/productos';

        if (categoria) {
          endpoint = `/productos/categoria/${categoria}`;
        }

        if (precio) {
          endpoint += `?sort=${precio}`;
        }

        const { data } = await api.get<Product[]>(endpoint);
        
        setProducts(data);
      } catch (err) {
        console.error('Error al cargar los productos:', err);
        setError('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoria, precio]);

  const paginatedProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const screenLoad = () => {
    return (
      <View style={styles.content}>
        <FlatList
          data={paginatedProducts}
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
          ListFooterComponent={
            <View style={styles.paginationContainer}>
              <TouchableOpacity 
                onPress={prevPage} 
                disabled={currentPage === 0}
                style={[
                  styles.paginationButton,
                  currentPage === 0 && styles.disabledButton
                ]}
              >
                <Ionicons 
                  name="chevron-back" 
                  size={24} 
                  color={currentPage === 0 ? "#aaa" : "#6BB1FF"} 
                />
              </TouchableOpacity>
              
              <Text style={styles.pageText}>
                {currentPage + 1} de {Math.ceil(products.length / ITEMS_PER_PAGE)}
              </Text>
              
              <TouchableOpacity 
                onPress={nextPage}
                disabled={(currentPage + 1) * ITEMS_PER_PAGE >= products.length}
                style={[
                  styles.paginationButton,
                  (currentPage + 1) * ITEMS_PER_PAGE >= products.length && styles.disabledButton
                ]}
              >
                <Ionicons 
                  name="chevron-forward" 
                  size={24} 
                  color={(currentPage + 1) * ITEMS_PER_PAGE >= products.length ? "#aaa" : "#6BB1FF"} 
                />
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <Picker
          selectedValue={categoria}
          style={styles.picker}
          onValueChange={(itemValue: any) => setCategoria(itemValue)}
        >
          <Picker.Item label="Seleccione una categoría" value="" />
          {categorias.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>

        <Picker
          selectedValue={precio}
          style={styles.picker}
          onValueChange={(itemValue: any) => setPrecio(itemValue)}
        >
          <Picker.Item label="Ordenar por precio" value="" />
          <Picker.Item label="Menor a mayor" value="ASC" />
          <Picker.Item label="Mayor a menor" value="DESC" />
        </Picker>
      </View>

      {loading ? <Loader /> : screenLoad()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    width: '100%',
    flex: 1,
  },
  listContainer: {
    paddingBottom: 20,
  },
  selectContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
  picker: {
    height: 50,
    width: '50%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  paginationButton: {
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default ProductosScreen;
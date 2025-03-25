// src/screens/ClimaView.tsx
import React, { useState, useRef } from 'react';
import { FlatList, StyleSheet, Text, View, Animated,  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import useProducts from '../../hooks/useProducts';
import Loader from '../../components/Loader';
import CardProductos from '../../components/CardProductos';

const ProductosScreen: React.FC = () => {
  const [categoria, setCategoria] = useState('');
  const [categorias, setCategorias] = useState(['Accesorios', 'Alimento', 'Peces']); // Ejemplo de categorías

  const { products, loading } = useProducts()

  // Estado para manejar la animación
  const translateY = useRef(new Animated.Value(0)).current; // Valor animado

  // Manejar el scroll
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y; // Verificar la posición de scroll

    if (offsetY > 50) {
      Animated.timing(translateY, {
        toValue: -100, // Ocultar la vista cuando el usuario hace scroll hacia abajo
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 0, // Mostrar la vista nuevamente si el usuario regresa hacia arriba
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Pantalla con la lista de pronósticos
  const LoadScreen = () => {

    return (
      <View style={styles.content}>

        <FlatList
          data={products}
          onScroll={handleScroll} // Detectar desplazamiento
          scrollEventThrottle={16} // Suavizar el manejo del evento de scroll
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

      <View style={styles.selectContainer}>
        {/*<Text style={styles.label}>Seleccionar categoría:</Text>*/}
        <Picker
          selectedValue={categoria}
          style={styles.picker}

          onValueChange={(itemValue: any) => setCategoria(itemValue)}>

          <Picker.Item label="Seleccione una categoría" value="" />
          {categorias.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>
      </View>

      {/*<Text>Vista de productos</Text>*/}


      {loading ? <Loader /> : LoadScreen()}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
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
  },
  picker: {
    height: 50,
    width: '50%',
  },
});

export default ProductosScreen
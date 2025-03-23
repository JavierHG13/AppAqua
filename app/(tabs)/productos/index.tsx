// src/screens/ClimaView.tsx
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import useProducts from '../../hooks/useProducts';
import Loader from '../../components/Loader';
import CardProductos from '../../components/CardProductos';

const ProductosScreen: React.FC = () => {

  const { products, loading } = useProducts()

  // Pantalla con la lista de pronósticos
  const LoadScreen = () => {

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

      {/*<Text>Vista de productos</Text>*/}

      {loading ? <Loader /> : LoadScreen()}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#ffff',
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
});

export default ProductosScreen
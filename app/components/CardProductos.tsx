import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface PropsCard {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}


const CardProductos = (props: PropsCard) => {
  const router = useRouter()

  const agregarAlCarrito = () => {
    console.log(`${props.nombre} ha sido agregado al carrito.`);
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: props.imagen }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{props.nombre}</Text>
        <Text style={styles.productPrice}>Precio: {props.precio}</Text>
        <Text
          style={[styles.productStatus, props.disponible ? styles.inStock : styles.outOfStock]}>
          {props.disponible ? 'Disponible' : 'No disponible'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push(`productos/detalles/${props._id}`)}>
          <Text style={styles.buttonText}>Detalles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={agregarAlCarrito}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardProductos

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#6200EE',
  },
  productStatus: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  inStock: {
    color: 'green',
  },
  outOfStock: {
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    backgroundColor: '#40a9ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%', // Asegura que los botones se ajusten al ancho de la fila
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

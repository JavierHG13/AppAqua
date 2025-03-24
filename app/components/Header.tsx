import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter()

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handlePress = (screen: string) => {
    router.navigate(screen)
    setMenuVisible(false); // Cerrar el menú después de navegar
  };

  const handleLogout = () => {
    logout();
    setMenuVisible(false); // Cerrar el menú después de cerrar sesión
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleMenu}>
        <FontAwesome name="bars" size={28} color="white" />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.menuOverlay}>
          <View style={styles.menu}>

            <TouchableOpacity onPress={() => handlePress('/home')}>
              <Text style={styles.menuItem}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('/productos')}>
              <Text style={styles.menuItem}>Productos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('/carrito')}>
              <Text style={styles.menuItem}>Carrito</Text>
            </TouchableOpacity>

            {isAuthenticated ? (
              <>
                <TouchableOpacity onPress={() => handlePress('/dashboard')}>
                  <Text style={styles.menuItem}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress('/perfil')}>
                  <Text style={styles.menuItem}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.menuItem}>Cerrar sesión</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => handlePress('/auth')}>
                <Text style={styles.menuItem}>Iniciar sesión</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      <View style={styles.icons}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color="#ccc" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholder="Buscar productos..."
            placeholderTextColor="#ccc"
          />
        </View>

        <TouchableOpacity onPress={() => handlePress('/carrito')}>
          <FontAwesome name="shopping-cart" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#1890ff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    position: 'relative', // Necesario para el menú overlay
    zIndex: 1, // Asegura que el header esté por encima del contenido
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingLeft: 10,
    height: 40,
    marginVertical: 10,
    marginRight: 15,
    width: '80%',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  menuOverlay: {
    position: 'absolute',
    top: 60, // Ajusta según la altura del header
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo semitransparente
    zIndex: 2, // Asegura que el menú esté por encima del contenido
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 15,
    shadowColor: '#000',

    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#1890ff',
  },
});
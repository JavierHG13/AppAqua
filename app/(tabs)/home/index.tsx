// src/screens/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView, Image, useWindowDimensions } from 'react-native';
import { Text, Card, Button, useTheme, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function Home() {
  const theme = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollView: {
      flex: 1,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      backgroundColor: '#6BB1FF',
    },
    welcomeTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.onPrimary,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: theme.colors.onPrimary,
      marginBottom: 16,
    },
    cardsContainer: {
      padding: 16,
    },
    card: {
      marginBottom: 16,
      backgroundColor: theme.colors.surface,
      elevation: 2,
      width: '100%',
      borderRadius: 12,
    },
    cardCover: {
      height: 180,
      backgroundColor: theme.colors.primaryContainer,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.onSurface,
    },
    categorySection: {
      marginTop: 8,
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 12,
      color: theme.colors.onSurface,
    },
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    categoryCard: {
      width: '45%',
      padding: 12,
      alignItems: 'center',
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      elevation: 1,
      marginBottom: 12,
    },
    categoryIcon: {
      fontSize: 24,
      color: theme.colors.primary,
    },
    categoryName: {
      textAlign: 'center',
      fontSize: 12,
      color: theme.colors.onSurface,
    },
    promotionBanner: {
      marginHorizontal: 16,
      marginVertical: 16,
      borderRadius: 8,
      overflow: 'hidden',
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D4E7FF',
    },
    promotionText: {
      color: theme.colors.onSecondaryContainer,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  const featuredCategories = [
    { id: '1', name: 'Alimentos', icon: '🍤' },
    { id: '2', name: 'Filtros', icon: '💧' },
    { id: '3', name: 'Iluminación', icon: '💡' },
    { id: '4', name: 'Peceras', icon: '🐠' },
    { id: '5', name: 'Automatización', icon: '🤖' },
    { id: '6', name: 'Decoración', icon: '🌿' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}> 
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.welcomeTitle}>Bienvenido a AquaSmart</Text>
          <Text style={styles.subtitle}>Todo para tu pecera automatizada</Text>
        </View>

        <Surface style={styles.promotionBanner}>
          <Text style={styles.promotionText}>20% DESCUENTO EN ALIMENTO PREMIUM</Text>
        </Surface>

        <View style={styles.categorySection}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <View style={styles.categoriesContainer}>
            {featuredCategories.map((category) => (
              <Surface
                key={category.id}
                style={styles.categoryCard}
                onTouchEnd={() => router.push(`/productos/categoria/${category.name}`)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
              </Surface>
            ))}
          </View>
        </View>

        <View style={styles.cardsContainer}>
          <Text style={[styles.sectionTitle, { width: '100%' }]}>Productos destacados</Text>

          <Card style={styles.card} onPress={() => router.push('/productos')}>
            <Card.Cover
              source={{ uri: 'https://images.unsplash.com/photo-159777694d3c-2d2c4e71c1a3' }}
              style={styles.cardCover}
            />
            <Card.Content style={{ paddingVertical: 12 }}>
              <Text style={styles.cardTitle}>Kit de Automatización</Text>
              <Text>Controla temperatura, iluminación y alimentación desde tu móvil</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="outlined">Ver más</Button>
              <Button mode="contained">Comprar</Button>
            </Card.Actions>
          </Card>

          <Card style={styles.card} onPress={() => router.push('/productos')}>
            <Card.Cover
              source={{ uri: 'https://images.unsplash.com/photo-1578916043269-53d5dfe9e4a9' }}
              style={styles.cardCover}
            />
            <Card.Content style={{ paddingVertical: 12 }}>
              <Text style={styles.cardTitle}>Alimento para Peces Tropicales</Text>
              <Text>Fórmula enriquecida con vitaminas y minerales</Text>
            </Card.Content>
            <Card.Actions>
              <Button mode="outlined">Ver más</Button>
              <Button mode="contained">Comprar</Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

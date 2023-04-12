import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Product = ({ product, addToCart, addToWishlist }) => {

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddToWish = () => {
    addToWishlist(product);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.price}>{product.desc}</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={handleAddToWish}>
            <MaterialIcons
              name="favorite"
              size={20}
              color="#800000"
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddToCart}>
            <MaterialIcons
              name="add-shopping-cart"
              size={20}
              color="#2aa52a" 
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 5,
  },
  imageContainer: {
    width: '30%',
    height: 100,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: 10,
  },
});

export default Product;

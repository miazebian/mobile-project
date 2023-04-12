import React, { useState, useEffect } from 'react';
import { View, Text , StyleSheet} from 'react-native';
import Slideshow from './home/SlideShow';
import Header from './home/Header';
import ProductContainer from './ProductContainer';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from './home/Footer';
import AsyncStorage from "@react-native-async-storage/async-storage";


const images = [
  'https://picsum.photos/id/237/3500/2095',
  'https://picsum.photos/id/169/2500/1662',
  'https://picsum.photos/id/702/5000/3333',
];

const Home = () => {

  useEffect(() => {
    sub();
  }, []);

  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);


  async function sub() {
    const productsString = await AsyncStorage.getItem("product");
    setProducts(JSON.parse(productsString));
  }
  sub();

  async function addToCart(product) {
    let updatedItem = product;
    if (product.page === "") {
      updatedItem = { ...product, page: "c" };
    } else {
      updatedItem = { ...product, page: "wc" };
    }
    const updatedItems = cartItems.filter(i => i.key !== cartItems.key).concat(updatedItem);
    setCartItems(updatedItems);
  
    let productsString = await AsyncStorage.getItem("product");
    let products = JSON.parse(productsString);
    const userId = await AsyncStorage.getItem("user");
  
    // Check if the product already exists for the user
    const existingProductIndex = products.findIndex(i => i.key === product.key && i.user === userId);
  
    if (existingProductIndex !== -1) {
      // Update the existing product
      const updatedProducts = products.map((i, index) => {
        if (index === existingProductIndex) {
          console.log(updatedItem);
          return updatedItem;
        } else {
          return i;
        }
      });
      await AsyncStorage.setItem("product", JSON.stringify(updatedProducts));
    } else {

      // Add the product to the user's list
      const newProduct = { ...updatedItem, user: userId };
      const updatedProducts = [...products, newProduct];
      await AsyncStorage.setItem("product", JSON.stringify(updatedProducts));
    }
    sub();
  }
  

  async function addToWishlist (product) {
    let updatedItem = product;
    if (product.page === "") {
      updatedItem = { ...product, page: "w" };
    } else {
      updatedItem = { ...product, page: "wc" };
    }
    const updatedItems = wishlist.filter(i => i.key !== wishlist.key).concat(updatedItem);
    setWishlist(updatedItems);
  
    let productsString = await AsyncStorage.getItem("product");
    let products = JSON.parse(productsString);
    const userId = await AsyncStorage.getItem("user");
  
    // Check if the product already exists for the user
    const existingProductIndex = products.findIndex(i => i.key === product.key && i.user === userId);
  
    if (existingProductIndex !== -1) {
      // Update the existing product
      const updatedProducts = products.map((i, index) => {
        if (index === existingProductIndex) {
          return updatedItem;
        } else {
          return i;
        }
      });
      await AsyncStorage.setItem("product", JSON.stringify(updatedProducts));
    } else {
      // Add the product to the user's list
      const newProduct = { ...updatedItem, user: userId };
      const updatedProducts = [...products, newProduct];
      await AsyncStorage.setItem("product", JSON.stringify(updatedProducts));
    }
  };

  const newarray = products.slice(-5);

  const adopt = products.filter((product) => product.category === 'adopt');

  return (
    <ScrollView>
      <Header />
      <Slideshow images={images} />
      <Text style={styles.title}>New Arrivals</Text>
      {newarray.map((item) => (
        <ProductContainer
          product={item}
          key={item.key}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
        />
      ))}
      <Text style={styles.title}>Adopt</Text>
      {adopt.map((item) => (
        <ProductContainer
          product={item}
          key={item.key}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
        />
      ))}
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
  },
});

export default Home;

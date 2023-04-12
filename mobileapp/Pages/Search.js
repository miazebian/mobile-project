import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Header from './home/Header';
import ProductContainer from './ProductContainer';
import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState('Choose');
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    async function getProducts() {
      const productsString = await AsyncStorage.getItem('product');
      const products = JSON.parse(productsString) || [];
      
      // Create a new array to hold the filtered products
      const filteredProducts = [];
    
      // Create a Set to keep track of processed product titles
      const processedTitles = new Set();
    
      // Loop through each product and filter out any products with duplicate titles
      products.forEach(product => {
        if (!processedTitles.has(product.title)) {
          filteredProducts.push(product);
          processedTitles.add(product.title);
        }
      });
    
      setOriginalProducts(filteredProducts);
      setFilteredProducts(filteredProducts);
    }
    
    getProducts();
  }, []);

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


  const sortProducts = (option) => {
    let sortedProducts = [];
    switch (option) {
      case 'priceLowToHigh':
        sortedProducts = [...originalProducts].sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        sortedProducts = [...originalProducts].sort((a, b) => b.price - a.price);
        break;
      case 'titleAToZ':
        sortedProducts = [...originalProducts].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleZToA':
        sortedProducts = [...originalProducts].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'categoryFood':
        sortedProducts = [...originalProducts].filter((product) => product.category === 'food');
        break;
      case 'categoryAccessory':
        sortedProducts = [...originalProducts].filter((product) => product.category === 'accessory');
        break;
      case 'categoryAdopt':
        sortedProducts = [...originalProducts].filter((product) => product.category === 'adopt');
        break;
      default:
        sortedProducts = [...originalProducts];
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  const handleSortOptionChange = (itemValue) => {
    setSortOption(itemValue);
    sortProducts(itemValue);
  };

  return (
    <View>
      <ScrollView>
        <Header />
        <Picker
          style={styles.picker}
          selectedValue={sortOption}
          onValueChange={handleSortOptionChange}
        >
          <Picker.Item label='Choose' value='Choose' />
          <Picker.Item label='Sort by price: Low to High' value='priceLowToHigh' />
          <Picker.Item label='Sort by price: High to Low' value='priceHighToLow' />
          <Picker.Item label='Sort by title: A to Z' value='titleAToZ' />
          <Picker.Item label='Sort by title: Z to A' value='titleZToA' />
          <Picker.Item label='Filter by category: Food' value='categoryFood' />
          <Picker.Item label='Filter by category: Accessory' value='categoryAccessory' />
          <Picker.Item label='Filter by category: Adopt' value='categoryAdopt' />
        </Picker>
        {filteredProducts.map((product) => (
          <ProductContainer key={product.key} 
          product={product} 
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  filterContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterDropdown: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  filterDropdownText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  productContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 10,
  },
  productDesc: {
    fontSize: 14,
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
});

export default Search;
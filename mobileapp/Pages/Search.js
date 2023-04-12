import React, { useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import Header from './home/Header';
import ProductContainer from "./ProductContainer";
import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';
import { products } from './products';

const Search = () => {



  const [sortOption, setSortOption] = useState('Choose');
  const [product, setProducts] = useState(products);
  const [products1, setProducts1] = useState(products);

  
  const sortProducts = (option) => {
    let sortedProducts = [];
    switch (option) {
      case 'priceLowToHigh':
        setProducts(product);
        sortedProducts = product.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        setProducts(product);
        sortedProducts = product.sort((a, b) => b.price - a.price);
        break;
      case 'titleAToZ':
        setProducts(product);
        sortedProducts = product.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'titleZToA':
        setProducts(product);
        sortedProducts = product.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'categoryFood':
        setProducts(product);
        sortedProducts = product.filter((product) => product.category === 'food');
        break;
      case 'categoryAccessory':
        setProducts(product);
        sortedProducts = product.filter((product) => product.category === 'accessory');
        break;
      case 'categoryAdopt':
        setProducts(product);
        sortedProducts = product.filter((product) => product.category === 'adopt');
        break;
      default:
        setProducts(product);
        sortedProducts = product;
        setProducts1=product;
        break;
    }
    setProducts1(sortedProducts);
  };

  return (
    <View>
    <ScrollView>
      <Header />
      <Picker
        style={styles.picker}
        selectedValue={sortOption}
        onValueChange={(itemValue) => {
          setSortOption(itemValue);
          sortProducts(itemValue);
        }}
      >
        <Picker.Item label='Choose'/>
        <Picker.Item label="Sort by price: Low to High" value="priceLowToHigh" />
        <Picker.Item label="Sort by price: High to Low" value="priceHighToLow" />
        <Picker.Item label="Sort by title: A to Z" value="titleAToZ" />
        <Picker.Item label="Sort by title: Z to A" value="titleZToA" />
        <Picker.Item label="Filter by category: Food" value="categoryFood" />
        <Picker.Item label="Filter by category: Accessory" value="categoryAccessory" />
        <Picker.Item label="Filter by category: Adopt" value="categoryAdopt" />
      </Picker>
      {products1?.map((product) => (
        <ProductContainer key={product.key} product={product} />
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
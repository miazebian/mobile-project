import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    sub();
  }, []);

  async function sub() {
    const productsString = await AsyncStorage.getItem("product");
    const products = JSON.parse(productsString);

    const userId = await AsyncStorage.getItem("user");

    const newItems = products.filter(
      (product) => product.user === userId && (product.page === "w" || product.page==="wc")
    );
    setItems(newItems);    
  }


async function removeItem(item){
  const updatedItem = { ...item, page: '' };
  const updatedItems = items.filter(i => i.key !== item.key);
  
  setItems(updatedItems);
sub();
  let productsString = await AsyncStorage.getItem('product');
  let products = JSON.parse(productsString);
  const userId = await AsyncStorage.getItem('user');
  
  const updatedProducts = products.map(i => {
    if (i.key === item.key && i.user === userId) {
      return updatedItem;
    } else {
      return i;
    }
    
  });
  
  await AsyncStorage.setItem('product', JSON.stringify(updatedProducts));
}
  

async function handleAddToCart(item) {
  const updatedItem = { ...item, page: 'wc' };
  const updatedItems = items.filter(i => i.key !== item.key).concat(updatedItem);
  
  setItems(updatedItems);

  let productsString = await AsyncStorage.getItem('product');
  let products = JSON.parse(productsString);
  const userId = await AsyncStorage.getItem('user');
  
  const updatedProducts = products.map(i => {
    if (i.key === item.key && i.user === userId) {
      return updatedItem;
    } else {
      return i;
    }
  });
  
  await AsyncStorage.setItem('product', JSON.stringify(updatedProducts));
}

  return (
    <ScrollView style={styles.cover}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Wishlist</Text>
        </View>
        {items.map((item) => (
          <View key={item.key} style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.itemsContainer}>
              <View style={styles.itemContainer}>
                <View style={styles.itemInfo}>
                  <Text style={styles.productName}>{item.title}</Text>
                  <Text style={styles.productPrice}>
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(item)}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item)}
                >
                  <MaterialIcons name="delete" size={20} color="#800000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cover: {
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    padding: 10,
    marginTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
  },
  productContainer: {
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#e8fce4",
    borderColor: "#800000",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  productImage: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    padding: 5,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    marginTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#e8fce4",
    padding: 10,
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: "#800000",
    fontSize: 18,
    fontWeight: "bold",
  },
  removeButton: {
    alignItems: "center",
    padding: 5,
    marginTop: 6,
  },
});

export default Wishlist;

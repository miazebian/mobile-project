import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Checkout = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    sub();
  }, []);

  async function sub() {
    const productsString = await AsyncStorage.getItem("product");
    const products = JSON.parse(productsString);

    const userId = await AsyncStorage.getItem("user");

    const newItems = products.filter(
      (product) =>
        product.user === userId &&
        (product.page === "c" || product.page === "wc")
    );
    setItems(newItems);
  }

  const [shippingPrice, setShippingPrice] = useState(10.0);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const applyCoupon = () => {
    if (couponCode !== "") {
      setIsCouponApplied(true);
    }
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <ScrollView style={styles.cover}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Checkout</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Order Details</Text>
        </View>
        {items.map((item) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.itemsContainer}>
              <View key={item.key} style={styles.itemContainer}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.title}</Text>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                </View>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <View style={styles.couponContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Enter coupon code"
              value={couponCode}
              onChangeText={setCouponCode}
            />
            <TouchableOpacity
              style={styles.couponButton}
              onPress={applyCoupon}
              disabled={isCouponApplied}
            >
              <Text style={styles.couponButtonText}>
                {isCouponApplied ? "Coupon applied" : "Apply coupon"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.totalLabel}>Total: ${totalPrice.toFixed(2)}</Text>

          <View style={styles.shippingContainer}>
            <Text style={styles.totalLabel}>Shipping: ${shippingPrice}</Text>
          </View>

          <Text style={styles.totalLabel}>
            Total: $
            {(isCouponApplied
              ? totalPrice * 0.9 + shippingPrice
              : totalPrice + shippingPrice
            ).toFixed(2)}
          </Text>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              navigation.navigate("pay", {
                data: (isCouponApplied
                  ? totalPrice * 0.9 + shippingPrice
                  : totalPrice + shippingPrice
                ).toFixed(2),
              })
            }
          >
            <Text style={styles.checkoutButtonText}>Procced to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

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
    marginTop: 10,
    marginLeft: 20,
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
  itemsContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: "100%",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  quantityContainer: {
    flexDirection: "row",
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
    justifyContent: "space-between",
    paddingTop: 20,
    marginTop: 20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  shippingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  shippingLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  shippingPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  checkoutButton: {
    backgroundColor: "#e8fce4",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  checkoutButtonText: {
    color: "#800000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  couponContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  couponButton: {
    backgroundColor: "#e8fce4",
    padding: 10,
    borderRadius: 5,
    width: 120,
  },
  couponButtonText: {
    color: "#800000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Checkout;

import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Payment = ({route}) => {
  const {data}=route.params
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  async function removeItems() {
    const userId = await AsyncStorage.getItem('user');
  
    // Remove items from AsyncStorage
    let productsString = await AsyncStorage.getItem('product');
    let products = JSON.parse(productsString);
    const updatedProducts = products.filter(p => {
      const isCurrentUserProduct = p.user === userId;
      const isPageC = p.page === 'c';
      if (isCurrentUserProduct && isPageC) {
        return false;
      }
      if (isCurrentUserProduct && p.page === 'wc') {
        p.page = 'w';
      }
      return true;
    });
  
    await AsyncStorage.setItem('product', JSON.stringify(updatedProducts));
  }
  

  const handlePayment = () => {
    if(cardNumber!==""&& cardHolder!=="" && expiryDate!=="" && cvv!==""){
      removeItems();

    }
  };

  return (
    <ScrollView style={styles.cover}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Payment</Text>
        </View>
        <Text style={styles.formLabel1}>Amount Due: ${data}</Text>
        <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Card Number</Text>

          <View style={styles.formGroup}>
            <MaterialIcons name="credit-card" size={24} color="black" style={styles.formIcon} />
            <TextInput
              style={styles.formInput}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
              required
              pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
            />
          </View>
          <Text style={styles.formLabel}>Card Holder Name</Text>

          <View style={styles.formGroup}>
            <MaterialIcons name="person" size={24} color="black" style={styles.formIcon} />
            <TextInput
              style={styles.formInput}
              placeholder="John Doe"
              value={cardHolder}
              onChangeText={setCardHolder}
              required
              pattern="^[a-zA-Z][a-zA-Z '-]{1,}$"
            />
          </View>
          <Text style={styles.formLabel}>Expiry Date</Text>
          <View style={styles.formRow}>
            <View style={styles.formGroup}>
              <MaterialIcons name="calendar-today" size={24} color="black" style={styles.formIcon} />
              <TextInput
                style={styles.formInput}
                placeholder="MM/YY"
                keyboardType="numeric"
                value={expiryDate}
                pattern="^(0[1-9]|1[0-2])\/([2-9][0-9])$"
                required
                onChangeText={setExpiryDate}
              />
            </View>
            </View>
              <Text style={styles.formLabel}>CVV</Text>

            <View style={styles.formGroup}>
              <MaterialIcons name="lock" size={24} color="black" style={styles.formIcon} />
              <TextInput
                style={styles.formInput}
                placeholder="123"
                keyboardType="numeric"
                value={cvv}
                required
                pattern="[0-9]{3}"
                onChangeText={setCvv}
              />
            </View>
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cover:{
    backgroundColor: "white",
  },
    container: {
    flex: 1,
  },
  header: {
    height: 130,
    backgroundColor: "#800000",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    paddingTop:30,
  },
  formItem: {
    marginBottom: 50,
  },
  formLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
  },
  formLabel1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingRight:30,
    },
  formInput: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#555",
    borderWidth: 1,
    borderColor: "black",
    width: "70%",
  },
  formRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "45%",
  },
  formIcon:{
    padding:10,
  },
  buttonContainer: {
    padding: 20,
  },
  payButton: {
    backgroundColor: "#e8fce4",
    padding: 10,
    borderRadius: 5,
    margin:10,
  },
  payButtonText: {
    color: "#800000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  formContainer: {
    margin: 30,
    padding:10,

  },
  formGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    margin:20,
  },
  formRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Payment;


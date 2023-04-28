import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import rings from "../img/pet1.png"


export const AboutUs = () => {
    return (
      <ScrollView>
    <View style={styles.container}>
      <View style={styles.aboutUsHeader}>
        <Text style={styles.headerText}>About Us</Text>
      </View>
      <Image source={rings} style={styles.image} />
      <View style={styles.aboutUsContent}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Welcome to our pet store. We help you find supplies for your pets.
            We have a wide range of products for your pets.
          </Text>
          <Text style={styles.text}>
            Our mission is to help you find convenient and affordable pet
            supplies that are trustworthy and reliable.
          </Text>
          <Text style={styles.text}>
            At our core, we are a team of passionate and experienced
            professionals who are dedicated to providing the best possible
            service to our clients. We understand the complexities and
            challenges of cross-border marriage, and we are here to guide and
            support you every step of the way.
            {"\n"}
            {"\n"}
            Sincerely,
            {"\n"}
            The Kindy Pets Team
          </Text>
          
        </View>
      </View>
    </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8fce4",
    minHeight: 820,
  },
  aboutUsHeader: {
    backgroundColor: "#ffff",
    padding: 60,
    paddingBottom:40,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign:"center",

  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign:"center",
  },
  aboutUsContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    paddingTop:0,
    margin:30,
    marginTop:10,
  },
  text:{
    textAlign:"center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: "15%",
  },
  ima:{
    height:"160%",

  },
})


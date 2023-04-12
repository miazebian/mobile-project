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
            Welcome to our online civil marriage website, where we help
            couples from different countries to legally and officially tie the
            knot. Our platform is designed to make the process of getting
            married between different countries as smooth and easy as
            possible, so you can focus on what really matters: your love and
            commitment to each other.
          </Text>
          <Text style={styles.text}>
            Our mission is to make civil marriage accessible and inclusive for
            everyone, regardless of their nationality, gender, or cultural
            background. We believe that love knows no borders, and we are
            committed to making it possible for couples to celebrate their
            love and commitment in a meaningful and legally recognized way.
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
            The Union Team
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


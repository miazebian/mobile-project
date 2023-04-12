import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-web";

export const Sign = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail]=useState("");
  const [popupStyle, showPopup] = useState(false);
  const navigation = useNavigation();

  const closeItem = () => {
    showPopup(false);
  };

  const openItem = () => {
    showPopup(true);
  };

  const popup = () => {
    openItem();
  };

  async function sub() {
    const accountsString = await AsyncStorage.getItem("account");

    const accounts = JSON.parse(accountsString);
    for (let i = 0; i < accounts.length; i++) {
      const c = JSON.stringify(username);
      const v = JSON.parse(c);
      if (accounts[i].username === v.text) {
        popup();
        return;
      }
    }
    const c = JSON.stringify(username);
    const v = JSON.parse(c);

    const c2 = JSON.stringify(password);
    const v2 = JSON.parse(c2);

    accounts.push({ username: v.text, password: v2.text });
    AsyncStorage.setItem("account", JSON.stringify(accounts));
    AsyncStorage.setItem("user", v.text);
    AsyncStorage.setItem("pass", v2.text);
    AsyncStorage.setItem("email", email.toString());


    navigation.navigate('home');
  }

  return (
    <View style={styles.container}>
      <View style={styles.rightPane}>
        <Image
          source={require("../img/pet1.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.label}>Enter Username</Text>
        <TextInput
          style={styles.input}
          placeholder="user123"
          onChangeText={(text) => setUsername({ text })}
        />
        <Text style={styles.label}>Enter Email</Text>
        <TextInput 
        style={styles.input} 
        placeholder="user123@gmail.com"
        onChangeText={(text)=> setEmail({text})} 
        />
        <Text style={styles.label}>Enter Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="u1234!"
          onChangeText={(text) => setPassword({ text })}
        />

        <TouchableOpacity style={styles.button} onPress={sub}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.create}>
         
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.createLink}> Login</Text>
          </TouchableOpacity>
        </Text>
        {popupStyle && (
          <View style={styles.popup}>
            <TouchableOpacity style={styles.closeButton} onPress={closeItem}>
              <Ionicons name="ios-close" size={32} color="#2aa52a" />
            </TouchableOpacity>
            <View style={styles.talk}>
              <Text style={styles.popupTitle}>Sign Up Failed</Text>
              <Text style={styles.popupText}>
                Username or Email already exits
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "center",
  },
  rightPane: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  title: {
    fontSize: 30,
    marginTop: 0,
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "#2aa52a",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2aa52a",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  create: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  createLink: {
    fontWeight: "bold",
    color: "#2aa52a",
  },
  popup: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 10,
    zIndex: 2,
  },
  talk: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
  popupTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  popupText: {
    fontSize: 16,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "28%",
  },
});

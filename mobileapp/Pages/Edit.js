import React, { useState, useRef } from "react";
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


export const Edit = () => {
  const [popupStyle, showPopup] = useState(false);
  
  const [s1, sets1] = useState("");
  const [s2, sets2] = useState("");

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

  const user = {
    username: "user123",
    email: "user123@gmail.com",
    password: "u1234!",
  };

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const saveChanges = () => {

    AsyncStorage.getItem("user").then((value) => {
      if (value === username) {
        AsyncStorage.setItem("user", username);
      }
    });
    AsyncStorage.getItem("pass").then((value) => {
      if (value === password) {
        AsyncStorage.setItem("password", password);
      }
    });
    AsyncStorage.getItem("email").then((value) => {
      if (value === email) {
        AsyncStorage.setItem("email", email);
      }
    });

      
        sets1("Changes Saved");
      sets2("Your changes have been saved");
      popup();
  };

  const logout =()=>{
    AsyncStorage.setItem("user", "");
    AsyncStorage.setItem("pass", "");
    navigation.navigate("login");
  }


  return (
    <View style={styles.container}>
      <View style={styles.rightPane}>
        <Image
          source={require("../img/pet1.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.title}>Edit User</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="user123"
          editable={true}
          onChangeText={setUsername}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="user123@gmail.com"
          onChangeText={setEmail}
          editable={true}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="u1234!"
          onChangeText={setPassword}
          editable={true}
        />
        <TouchableOpacity style={styles.button} onPress={saveChanges}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>

        <Text style={styles.create}>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.createLink}>Cancel</Text>
          </TouchableOpacity>
        </Text>

        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        

{popupStyle && (
          <View style={styles.popup}>
            <TouchableOpacity style={styles.closeButton} onPress={closeItem}>
              <Ionicons name="ios-close" size={32} color="#2aa52a" />
            </TouchableOpacity>
            <View style={styles.talk}>
            <Text style={styles.popupTitle}>{s1}</Text>
              <Text style={styles.popupText}>{s2}</Text>
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
  },
  title: {
    fontSize: 30,
    marginTop: 0,
    marginBottom: 10,
    fontWeight: "bold",
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

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';

export const ContactUs = () => {

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Contact Us</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label} accessibilityLabel="Your Name">Your Name</Text>
            <TextInput style={styles.input} placeholder="Enter your name" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} accessibilityLabel="Your Email">Your Email</Text>
            <TextInput style={styles.input} keyboardType="email-address" placeholder="Enter your email" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} accessibilityLabel="Your Message">Your Message</Text>
            <TextInput style={styles.messageInput} multiline numberOfLines={5} placeholder="What can we help you with?" />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => console.log('Submit button pressed')}>
            <Text style={styles.buttonText}>Send your message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:70,
    flexDirection: "column",
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    backgroundColor:'#e8fce4'
  },
  title: {
    fontSize: 30,
    marginTop:0,
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
    width:195,
    borderColor: "#2aa52a",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  messageInput:{
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
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 48,
    borderRadius: 16,
    maxWidth: 800,
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: '10%',
    marginTop: 16,
    marginBottom: 16
  },
});

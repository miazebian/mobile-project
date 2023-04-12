import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from "@react-navigation/native";


export default function Header() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchBar} placeholder="Search" />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('search')}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2aa52a',
  },
  header: {
    backgroundColor: '#2aa52a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    paddingTop: 80,
    flexDirection: 'row',
  },

  searchBar: {
    backgroundColor: '#fff',
    width: '80%',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    borderColor: 'gray',
    borderWidth: 1,
    
  },

  button: {
    backgroundColor: 'white',
    height: 35,
    width:60,
    marginLeft: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#2aa52a',
    fontSize: 16,
  },
});

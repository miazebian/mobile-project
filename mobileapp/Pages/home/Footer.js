import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import MapView, { Callout, Marker } from 'react-native-maps';


const Footer = () => {
    const navigation = useNavigation();
    const[pin, setpin]=React.useState(//setting the default pin coordinates
    {
      latitude:33.888630,
      longitude: 35.495480,
    });

  return (
    <View style={styles.footer}>
       <View style={styles.footerSection}>
      <Text style={styles.footerSectionTitle}>Get to Know Us</Text>
        <Text style={styles.footerSectionText}>
        <TouchableOpacity onPress={() => navigation.navigate("about")}>
            <Text style={styles.footerSectionText}>About Us</Text>
          </TouchableOpacity>
        </Text>
        </View>
        <View style={styles.footerSection}>
      <Text style={styles.footerSectionTitle}>Having problems let us know</Text>
        <Text style={styles.footerSectionText}>
        <TouchableOpacity onPress={() => navigation.navigate("contact")}>
            <Text style={styles.footerSectionText}>Contact Us</Text>
          </TouchableOpacity>
        </Text>
        <View style={styles.footerSection}>
        <Text style={styles.footerSectionTitle}>Contact Information</Text>
        <Text style={styles.footerSectionText}>
          hadi.hassoun.03@gmail.com
        </Text>
        <Text style={styles.footerSectionText}>+961 01 85 78 96</Text>
        <Text style={styles.footerSectionText}>+961 70 99 65 58</Text>
      </View>
      <View style={styles.footerSection}>
        <Text style={styles.footerSectionTitle}>Address</Text>
        <Text style={styles.footerSectionText}>
          Hamra Street Above Antoine Library 2nd floor, Beirut, Lebanon
        </Text>
        <MapView style={styles.map}
      initialRegion={{
        latitude: 33.888630,
        longitude: 35.495480,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        
        <Marker 
        style={styles.markerstyle} //makes the map take over the entire screen at all times
        coordinate={pin}//sets the marker on at the coordinates
        draggable={true}//makes the marker draggable
        
        onDragStart={(e)=>{}}
        onDragEnd={(e)=>{ //are used to change the current location when the marker is moved
         setpin({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude
         })
        }}
        >
            <Callout> 
              {/* Text shown when marker is pressed*/}
              <Text>You're here</Text>
            </Callout>
        </Marker>
      </MapView>
      </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#2aa52a',
    color: '#ffffff',
    justifyContent: 'space-evenly',
    paddingLeft:5,
  },
  footerSection: {
    paddingVertical: 10,
  },
  footerSectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  footerSectionText: {
    color: '#ffffff',
    marginBottom: 5,
  },
  map:{
    margin:2,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height/4,
  },
});

export default Footer;

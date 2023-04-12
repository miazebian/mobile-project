import React from "react";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

import { Edit } from "./Edit";
import Home from "./Home";
import Cart from "./prod/Cart";
import Wishlist from "./prod/Wishlist";

export const Tabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          )
        }}
      />

      <Tab.Screen name="Cart" component={Cart} 
       options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="shopping-cart" color={color} size={size} />
        ),
      }}/>
      
      <Tab.Screen name="Wishlist" component={Wishlist}
       options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="favorite" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Profile" component={Edit} 
       options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="person" color={color} size={size} />
        ),
      }}/>
    </Tab.Navigator>
  );
};

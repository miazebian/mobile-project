import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Sign } from './Pages/Sign';
import { Login } from './Pages/Login';
import { ContactUs } from './Pages/ContactUs';
import { AboutUs } from './Pages/AboutUs';
import { Edit } from './Pages/Edit';
import Home from './Pages/Home';
import { products } from './Pages/products';
import Search from './Pages/Search';
import { Tabs } from './Pages/Tabs';
import Wishlist from './Pages/prod/Wishlist';
import Cart from './Pages/prod/Cart';
import Checkout from './Pages/prod/Checkout';
import Payment from './Pages/prod/Payment';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);

export let accounts = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
  { username: "user3", password: "password3" },
  { username: "user4", password: "password4" },
  { username: "user5", password: "password5" }
];
AsyncStorage.setItem('account', JSON.stringify(accounts));




export default function App() {
  {products}
  const Stack=createStackNavigator();
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='login' screenOptions={{headerShown: false}} >
        <Stack.Screen name="sign" component={Sign}/>
        <Stack.Screen name="login" component={Login}/>
        <Stack.Screen name="contact" component={ContactUs}/>
        <Stack.Screen name="about" component={AboutUs}/>
        <Stack.Screen name="edit" component={Edit}/>
        <Stack.Screen name="home" component={Tabs}/>
        <Stack.Screen name="search" component={Search}/>
        <Stack.Screen name="wish" component={Wishlist}/>
        <Stack.Screen name="cart" component={Cart}/>
        <Stack.Screen name="check" component={Checkout}/>
        <Stack.Screen name="pay" component={Payment}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}


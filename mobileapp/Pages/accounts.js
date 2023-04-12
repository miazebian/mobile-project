import AsyncStorage from '@react-native-async-storage/async-storage';
export let accounts = [
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
    { username: "user3", password: "password3" },
    { username: "user4", password: "password4" },
    { username: "user5", password: "password5" }
  ];
AsyncStorage.setItem('account', JSON.stringify(accounts));
const accountsString = await AsyncStorage.getItem('accounts');
const accounts = JSON.parse(accountsString);

import React from "react";
import { View, Text , StyleSheet} from "react-native";
import Slideshow from "./home/SlideShow";
import Header from "./home/Header";
import ProductContainer from "./ProductContainer";
import { ScrollView } from "react-native-gesture-handler";
import Footer from "./home/Footer";
import { products } from "./products";

const images = [
  "https://picsum.photos/id/237/3500/2095",
  "https://picsum.photos/id/169/2500/1662",
  "https://picsum.photos/id/702/5000/3333",
];
const newarray= products.slice(-5);

const adopt=products.filter((product) => product.category === 'adopt');

export default function Home() {
  return (
    <ScrollView>
        <Header />
        <Slideshow images={images} />
        <Text style={styles.Title}>New Arrivals</Text>
        {newarray.map((item)=>(
  <ProductContainer product={item} key={item.key}/>
))}
          <Text style={styles.Title}>Adopt</Text>
         
{adopt.map((item)=>(
  <ProductContainer product={item} key={item.key}/>
  
))}

          <Footer/>

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  Title: {
    fontWeight: 'bold',
    fontSize:28,
    marginBottom: 10,
  },
});


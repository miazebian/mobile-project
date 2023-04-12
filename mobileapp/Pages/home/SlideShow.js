import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


function Slideshow(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    const index = (currentIndex - 1 + props.images.length) % props.images.length;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index = (currentIndex + 1) % props.images.length;
    setCurrentIndex(index);
  };

  return (
    <View style={styles.cor}>
    <View style={styles.container}>
      <View style={styles.slideshow}>
        <Image
          source={{ uri: props.images[currentIndex] }}
          style={styles.slideImage}
          resizeMode="cover"
        />
        <View style={styles.buttons}>
          <AntDesign
            name="left"
            size={24}
            color="#800000"
            style={styles.previousButton}
            onPress={previousSlide}
          />
          <AntDesign
            name="right"
            size={24}
            color="#800000"
            style={styles.nextButton}
            onPress={nextSlide}
          />
        </View>
      </View>
      <View style={styles.sliderContainer}>
        {props.images.map((_, index) => (
          <View key={index} style={index === currentIndex ? styles.activeDot : styles.dot}>
          </View>
        ))}
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cor:{
    height:200,

  },
  container: {
    flex: 1,
  },
  slideshow: {
    flex: 1,
    position: 'relative',
  },
  slideImage: {
    width: '100%',
    height: '100%',
  },
  buttons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  previousButton: {
    padding: 10,
  },
  nextButton: {
    padding: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: '#800000',
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
    backgroundColor: '#2aa52a',
  },
});

export default Slideshow;
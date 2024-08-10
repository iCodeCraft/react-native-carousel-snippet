import React, {useState} from 'react';
import {
  StatusBar,
  FlatList,
  SafeAreaView,
  Image,
  View,
  Text,
  Dimensions,
  StyleSheet,
} from 'react-native';

import * as images from './imgs';

const {width} = Dimensions.get('window');

const imageArray = Object.entries(images).map(([key, number]) => ({
  key,
  uri: number,
}));

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScrollEnd = ev => {
    const index = Math.floor(ev.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={imageArray}
        keyExtractor={item => item.key}
        onMomentumScrollEnd={handleScrollEnd}
        renderItem={({item}) => (
          <View style={styles.imageContainer}>
            <Image source={item.uri} style={styles.image} />
          </View>
        )}
      />
      <Text style={styles.indexText}>{currentIndex + 1}.png</Text>
    </SafeAreaView>
  );
};

const IMAGE_WIDTH = width * 0.75;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 30,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 30,
  },
  indexText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Carousel;

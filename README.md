# Simple React Native Carousel

A simple and easy-to-use carousel component for React Native. This snippet demonstrates a straightforward implementation of a carousel using `FlatList` for horizontal image scrolling.

<img src="./demo.gif" alt="Simple React Native Carousel" />

## Features

- Horizontal scrolling carousel
- Paging enabled for smooth transitions
- Displays the current image index
- Easy to integrate and customize
- Easily use local images by importing them directly.

## Usage

1. **Add images to your project:**

   Create an `imgs.js` file (or any name you prefer) in the same directory and export your images. Example:

   ```javascript
   // imgs.js
   import img1 from './assets/img1.png';
   import img2 from './assets/img2.png';
   // Import more images as needed

   export default {
     img1,
     img2,
     // Export more images as needed
   };
   ```

2. **Use the Carousel component:**

   ```javascript
   import React from 'react';
   import { SafeAreaView } from 'react-native';
   import Carousel from './Carousel'; // Adjust the import path if needed

   const App = () => {
     return (
       <SafeAreaView style={{ flex: 1 }}>
         <Carousel />
       </SafeAreaView>
     );
   };

   export default App;
   ```

## Props

- **`images`** (required): An object containing the images to be displayed in the carousel. The keys should be unique identifiers for each image, and the values should be the image imports.

## Code

Here's the code for the `Carousel` component:

```javascript
import React, { useState } from 'react';
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

import * as images from './imgs'; // Adjust the import path if needed

const { width } = Dimensions.get('window');

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
        renderItem={({ item }) => (
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
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

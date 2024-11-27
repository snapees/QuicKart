import {Image, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {useSharedValue} from 'react-native-reanimated';
import {screenWidth} from '@utils/Scaling';
import Carousel from 'react-native-reanimated-carousel';
import ScalePress from '@components/ui/ScalePress';

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

interface AddCarousalProps {
  adData: any;
}

const AddCarousal: FC<AddCarousalProps> = ({adData}) => {
  const progressValue = useSharedValue(0);

  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.5,
  };

  console.log('Ad Data:', adData);

  return (
    <View style={styles.container}>
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3000}
        // mode="parallax"
        data={adData}
        modeConfig={{
          parallaxScrollingOffset: 0,
          parallaxScrollingScale: 0.94,
        }}
        renderItem={({item}: any) => {
          return (
            <ScalePress style={styles.imageContainer}>
              <Image source={item} style={styles.img} />
            </ScalePress>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: -10,
    marginVertical: 20,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});

export default AddCarousal;

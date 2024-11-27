/* eslint-disable react-native/no-inline-styles */
import CustomText from '@components/ui/CustomText';
import UniversalAdd from '@components/ui/UniversalAdd';
import {Colors, Fonts} from '@utils/Constants';
import {screenHeight} from '@utils/Scaling';
import React, {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

interface productItemProps {
  item: any;
  index: number;
}

const ProductItem: FC<productItemProps> = ({item, index}) => {
  const isSecondColumn = index % 2 !== 0;
  return (
    <View style={[styles.container, {marginRight: isSecondColumn ? 10 : 0}]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.flexRow}>
          <Image
            source={require('@assets/icons/clock.png')}
            style={styles.clockIcon}
          />
          <CustomText fontFamily={Fonts.Medium} fontSize={RFValue(6)}>
            8 Min
          </CustomText>
        </View>

        <CustomText
          variant="h8"
          fontFamily={Fonts.Medium}
          numberOfLines={2}
          style={styles.text}>
          {item.name}
        </CustomText>

        <View style={styles.priceContainer}>
          <View style={{marginRight: 10}}>
            {/* <View> */}
            <CustomText variant="h8" fontFamily={Fonts.Medium}>
              ₨ {item?.price}
            </CustomText>
            <CustomText
              variant="h8"
              fontFamily={Fonts.Medium}
              style={styles.text1}>
              ₨ {item?.discountPrice}
            </CustomText>
          </View>
          {/* <View style={{marginRight: 10}}> */}
          <UniversalAdd item={item} />
          {/* </View> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    height: screenHeight * 0.14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  image: {
    height: '100%',
    width: '100%',
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flexRow: {
    flexDirection: 'row',
    padding: 2,
    borderRadius: 4,
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.backgroundSecondary,
    alignSelf: 'flex-start',
  },
  clockIcon: {
    height: 15,
    width: 15,
  },
  text: {
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginTop: 'auto',
  },
  text1: {
    opacity: 0.8,
    textDecorationLine: 'line-through',
  },
});

export default ProductItem;

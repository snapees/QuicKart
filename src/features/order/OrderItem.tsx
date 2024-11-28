import {Image, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import UniversalAdd from '@components/ui/UniversalAdd';

interface orderItemProps {
  item: any;
}

const OrderItem: FC<orderItemProps> = ({item}) => {
  return (
    <View style={styles.flexRow}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item?.item?.image}} style={styles.image} />
      </View>

      <View style={styles.textContainer}>
        <CustomText variant="h8" numberOfLines={2} fontFamily={Fonts.Medium}>
          {item.item.name}
        </CustomText>
        <CustomText variant="h9" fontFamily={Fonts.Regular}>
          {item.item.quantity}
        </CustomText>
      </View>

      <View style={styles.container}>
        <UniversalAdd item={item.item} />
        <CustomText
          variant="h8"
          fontFamily={Fonts.Medium}
          style={styles.containerText}>
          ₨ {item.count * item.item.price}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopWidth: 0.6,
    borderTopColor: Colors.border,
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
    width: '17%',
  },
  image: {
    width: 40,
    height: 40,
  },
  textContainer: {
    width: '55%',
  },
  container: {
    width: '20%',
    alignItems: 'flex-end',
  },
  containerText: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});

export default OrderItem;

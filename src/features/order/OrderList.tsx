import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useCartStore} from '@state/cartStore';
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import OrderItem from './OrderItem';

const OrderList = () => {
  const cartItems = useCartStore(state => state.cart);
  const totalItems = cartItems?.reduce((acc, cart) => acc + cart?.count, 0);
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.imageContainer}>
          <Image
            source={require('@assets/icons/clock.png')}
            style={styles.image}
          />
        </View>
        <View>
          <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
            Delivery in 9 minutes
          </CustomText>
          <CustomText
            variant="h8"
            fontFamily={Fonts.SemiBold}
            style={styles.text}>
            Shipments of {totalItems || 0} item
          </CustomText>
        </View>
      </View>

      {cartItems?.map(item => {
        return <OrderItem key={item._id} item={item} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    padding: 10,
    borderRadius: 15,
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {opacity: 0.5},
});

export default OrderList;

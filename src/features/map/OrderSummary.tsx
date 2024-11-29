import {Image, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BillDetails from '@features/order/BillDetails';

interface orderSummaryprops {
  order: any;
}

const OrderSummary: FC<orderSummaryprops> = ({order}) => {
  const totalPrice =
    order?.items?.reduce(
      (total: number, cartItem: any) =>
        total + cartItem.item.price * cartItem.count,
      0,
    ) || 0;

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon
            name="shopping-outline"
            color={Colors.disabled}
            size={RFValue(20)}
          />
        </View>
        <View>
          <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
            Order Summary
          </CustomText>
          <CustomText variant="h9" fontFamily={Fonts.Medium}>
            Order ID - #{order?.orderId}
          </CustomText>
        </View>
      </View>

      {order?.items?.map((item: any, index: number) => {
        return (
          <View style={styles.flexRow} key={index}>
            <View style={styles.imageContainer}>
              <Image source={{uri: item?.item?.image}} style={styles.image} />
            </View>

            <View style={styles.afterImageContainer}>
              <CustomText
                variant="h8"
                numberOfLines={2}
                fontFamily={Fonts.Medium}>
                {item?.item?.name}
              </CustomText>
              <CustomText variant="h9">{item?.item?.quantity}</CustomText>
            </View>

            <View style={styles.priceContainer}>
              <CustomText
                variant="h8"
                fontFamily={Fonts.Medium}
                style={styles.priceText}>
                ₨ {item?.count * item?.item?.price}
              </CustomText>
              <CustomText
                variant="h8"
                fontFamily={Fonts.Medium}
                style={styles.priceText}>
                {item?.count}X
              </CustomText>
            </View>
          </View>
        );
      })}

      <BillDetails totalItemPrice={totalPrice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 15,
    padding: 10,
    width: '17%',
  },
  image: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  afterImageContainer: {
    width: '55%',
  },
  priceContainer: {
    width: '20%',
    alignItems: 'flex-end',
  },
  priceText: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});

export default OrderSummary;

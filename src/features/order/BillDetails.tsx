/* eslint-disable react-native/no-inline-styles */
import CustomText from '@components/ui/CustomText';
import {Colors, Fonts} from '@utils/Constants';
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface billDetailsProps {
  totalItemPrice: number;
}

const ReportItem: FC<{
  iconName: string;
  underline?: boolean;
  title: string;
  price: number;
}> = ({iconName, underline, title, price}) => {
  return (
    <View style={[styles.flexRowBetween, {marginBottom: 10}]}>
      <View style={styles.flexRow}>
        <Icon
          name={iconName}
          style={{opacity: 0.7}}
          size={RFValue(12)}
          color={Colors.text}
        />
        <CustomText
          variant="h8"
          style={{
            textDecorationLine: underline ? 'underline' : 'none',
            textDecorationStyle: 'dashed',
          }}
          fontFamily={Fonts.Regular}>
          {title}
        </CustomText>
      </View>
      <CustomText variant="h8" fontFamily={Fonts.Regular}>
        ₨ {price}
      </CustomText>
    </View>
  );
};

const BillDetails: FC<billDetailsProps> = ({totalItemPrice}) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text} fontFamily={Fonts.SemiBold}>
        BillDetails
      </CustomText>

      <View style={styles.billContainer}>
        <ReportItem
          iconName="article"
          title="Items Total"
          price={totalItemPrice}
        />
        <ReportItem iconName="pedal-bike" title="Delivery Charge" price={29} />
        <ReportItem iconName="shopping-bag" title="Handling Charge" price={2} />
        <ReportItem iconName="cloudy-snowing" title="Surge Charge" price={3} />
      </View>

      <View style={[styles.flexRowBetween, {marginBottom: 15}]}>
        <CustomText
          variant="h7"
          fontFamily={Fonts.SemiBold}
          style={styles.text}>
          Grand Total
        </CustomText>
        <CustomText fontFamily={Fonts.SemiBold} style={styles.text}>
          ₨ {totalItemPrice + 34}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 15,
  },
  text: {
    marginHorizontal: 10,
    marginTop: 15,
  },
  billContainer: {
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.7,
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default BillDetails;

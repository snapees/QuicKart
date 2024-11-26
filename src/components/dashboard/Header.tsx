import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAuthStore} from '@state/authStore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface headerProps {
  showNotice: () => void;
}

const Header: FC<headerProps> = ({showNotice}) => {
  const {user, setUser} = useAuthStore();

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity activeOpacity={0.8}>
        <CustomText variant="h8" fontFamily={Fonts.Bold} style={styles.text}>
          Delivery In
        </CustomText>
        <View style={styles.flexRowGap}>
          <CustomText
            variant="h2"
            fontFamily={Fonts.SemiBold}
            style={styles.text}>
            10 Minutes
          </CustomText>
          <TouchableOpacity onPress={showNotice} style={styles.noticeBtn}>
            <CustomText
              variant="h2"
              fontFamily={Fonts.SemiBold}
              fontSize={RFValue(8)}
              style={styles.raintext}>
              Rain 🌧️
            </CustomText>
          </TouchableOpacity>
        </View>

        {/* address */}
        <View style={styles.flexRow}>
          <CustomText
            variant="h8"
            fontFamily={Fonts.Medium}
            numberOfLines={1}
            style={styles.text2}>
            {user?.address || 'Knowhere, Somewhere 😍'}
          </CustomText>
          <Icon
            name="menu-down"
            color="#fff"
            size={RFValue(20)}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <Icon name="account-circle-outline" color="#fff" size={RFValue(36)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 10 : 5,
  },
  text: {
    color: '#fff',
  },
  flexRowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  noticeBtn: {
    backgroundColor: '#e8eaf5',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    bottom: -2,
  },
  flexRow: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    width: '70%',
    marginLeft: 2,
  },
  text2: {
    color: '#fff',
    width: '90%',
    textAlign: 'center',
  },
  icon: {bottom: -2},
  raintext: {
    color: '#3b4886',
  },
});

export default Header;

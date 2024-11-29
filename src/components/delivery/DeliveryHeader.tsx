import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useAuthStore} from '@state/authStore';
import {Colors, Fonts} from '@utils/Constants';
import CustomText from '@components/ui/CustomText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {storage, tokenStorage} from '@state/storage';

interface deliveryHeaderProps {
  name: string;
  email: string;
}

const DeliveryHeader: FC<deliveryHeaderProps> = ({name, email}) => {
  const {logout} = useAuthStore();
  return (
    <View style={styles.flexRow}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@assets/images/delivery_boy.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <CustomText variant="h4" fontFamily={Fonts.SemiBold}>
          Hello {name}!
        </CustomText>
        <CustomText variant="h8" fontFamily={Fonts.Medium}>
          {email}
        </CustomText>
      </View>

      <TouchableOpacity
        onPress={() => {
          logout();
          resetAndNavigate('CustomerLogin');
          tokenStorage.clearAll();
          storage.clearAll();
        }}>
        <Icon name="logout" color="black" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    padding: 4,
    borderRadius: 100,
    height: 60,
    width: 60,
    overflow: 'hidden',
    backgroundColor: Colors.backgroundSecondary,
  },
  image: {
    height: '100%',
    width: '100%',
    bottom: -8,
    resizeMode: 'contain',
  },
  infoContainer: {
    width: '70%',
  },
});

export default DeliveryHeader;

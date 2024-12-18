import React, {FC, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {deliveryLogin} from '@service/authService';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import {screenHeight} from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import CustomInput from '@components/ui/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '@components/ui/CustomButton';

const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await deliveryLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error) {
      Alert.alert('Login Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require('@assets/animations/delivery_man.json')}
            />
          </View>

          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText
            variant="h5"
            fontFamily={Fonts.SemiBold}
            style={styles.text}>
            Faster Than Flash ⚡
          </CustomText>

          {/* email block */}
          <CustomInput
            onChangeText={setEmail}
            value={email}
            left={
              <Icon
                name="mail"
                color="#f8890e"
                style={styles.icon}
                size={RFValue(18)}
              />
            }
            placeholder="Email"
            inputMode="email"
            right={false}
          />

          {/* password block */}
          <CustomInput
            onChangeText={setPassword}
            value={password}
            left={
              <Icon
                name="key-sharp"
                color="#f8890e"
                style={styles.icon}
                size={RFValue(18)}
              />
            }
            placeholder="Password"
            secureTextEntry
            right={false}
          />

          {/* submit button */}
          <CustomButton
            disabled={email.length === 0 || password.length < 8}
            title="Login"
            onPress={handleLogin}
            loading={loading}
          />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  lottieContainer: {
    height: screenHeight * 0.12,
    width: '100%',
  },
  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
  },
  icon: {
    marginLeft: 10,
  },
});

export default DeliveryLogin;

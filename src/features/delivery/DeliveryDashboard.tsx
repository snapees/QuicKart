import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuthStore} from '@state/authStore';

const DeliveryDashboard = () => {
  const {user} = useAuthStore();
  console.log(user);
  return (
    <View>
      <Text>DeliveryDashboard</Text>
    </View>
  );
};

export default DeliveryDashboard;

const styles = StyleSheet.create({});

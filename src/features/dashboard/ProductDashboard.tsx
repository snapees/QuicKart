import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useAuthStore} from '@state/authStore';

const ProductDashboard = () => {
  const {user} = useAuthStore();
  console.log(user);
  return (
    <View>
      <Text>ProductDashboard</Text>
    </View>
  );
};

export default ProductDashboard;

const styles = StyleSheet.create({});

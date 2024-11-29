import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '@utils/Constants';
import WAlletItem from './WAlletItem';

const WalletSection = () => {
  return (
    <View style={styles.walletContainer}>
      <WAlletItem icon="wallet-outline" label="wallet" />
      <WAlletItem icon="chatbubble-ellipses-outline" label="Support" />
      <WAlletItem icon="card-outline" label="Payments" />
    </View>
  );
};

const styles = StyleSheet.create({
  walletContainer: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 20,
  },
});

export default WalletSection;

/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useAuthStore} from '@state/authStore';
import {Colors} from '@utils/Constants';
import DeliveryHeader from '@components/delivery/DeliveryHeader';
import TabBar from '@components/delivery/TabBar';
import {fetchOrders} from '@service/orderService';
import CustomText from '@components/ui/CustomText';
import OrderItem from '@components/delivery/OrderItem';

const DeliveryDashboard = () => {
  const {user} = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>(
    'available',
  );

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const renderOrderItem = ({item, index}: any) => {
    return <OrderItem index={index} item={item} />;
  };

  const fetchData = async () => {
    setData([]);
    setRefreshing(true);
    setLoading(true);
    const data = await fetchOrders(selectedTab, user?._id, user?.branch);
    setData(data);
    setRefreshing(false);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>
      <View style={styles.subContainer}>
        <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab} />

        <FlatList
          data={data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => await fetchData()}
            />
          }
          ListEmptyComponent={() => {
            if (loading) {
              return (
                <View style={styles.center}>
                  <ActivityIndicator size="small" color={Colors.secondary} />
                </View>
              );
            }
            return (
              <View style={styles.center}>
                <CustomText>No orders available</CustomText>
              </View>
            );
          }}
          renderItem={renderOrderItem}
          keyExtractor={item => item.orderId}
          contentContainerStyle={styles.flatlistContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  subContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
    padding: 6,
  },
  flatlistContainer: {
    padding: 2,
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeliveryDashboard;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import CustomText from '@components/ui/CustomText';
import {useNavigationState} from '@react-navigation/native';
import {SOCKET_URL} from '@service/config';
import {getOrderById} from '@service/orderService';
import {useAuthStore} from '@state/authStore';
import {hocStyles} from '@styles/GlobalStyle';
import {Colors, Fonts} from '@utils/Constants';
import {navigate} from '@utils/NavigationUtils';
import React, {ComponentType, FC, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import io from 'socket.io-client';

const withLiveStatus = <P extends object>(
  WrappedComponent: ComponentType<P>,
): FC<P> => {
  const WithLiveStatusComponent: FC<P> = props => {
    const {currentOrder, setCurrentOrder} = useAuthStore();
    const routeName = useNavigationState(
      state => state.routes[state.index]?.name,
    );
    const fetchOrderDetails = async () => {
      const data = await getOrderById(currentOrder?._id as any);
      setCurrentOrder(data);
    };

    useEffect(() => {
      if (currentOrder) {
        const socketInstance = io(SOCKET_URL, {
          transports: ['websocket'],
          withCredentials: false,
        });
        socketInstance.emit('joinRoom', currentOrder?._id);
        socketInstance.on('liveTrackingUpdates', updateOrder => {
          fetchOrderDetails();
          console.log('RECEIVING LIVE LOCATION UPDATES ⛔');
        });
        socketInstance.on('orderConfirmed', confirmOrder => {
          fetchOrderDetails();
          console.log('ORDER CONFIRMATION LIVE LOCATION UPDATES ⛔');
        });

        return () => {
          socketInstance.disconnect();
        };
      }
    }, [currentOrder]);

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {currentOrder && routeName === 'ProductDashboard' && (
          <View
            style={[
              hocStyles.cartContainer,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View style={styles.flexRow}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('@assets/icons/bucket.png')}
                  style={styles.image}
                />
              </View>

              <View style={styles.afterImage}>
                <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                  Order is {currentOrder?.status}
                </CustomText>
                <CustomText variant="h9" fontFamily={Fonts.Medium}>
                  {currentOrder?.items![0]?.item.name +
                    (currentOrder?.items?.length - 1 > 0
                      ? ` and ${currentOrder?.items?.length - 1} + items`
                      : '')}
                </CustomText>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => navigate('LiveTracking')}
              style={styles.btn}>
              <CustomText
                variant="h8"
                style={{color: Colors.secondary}}
                fontFamily={Fonts.Medium}>
                View
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return WithLiveStatusComponent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 10,
    padding: 10,
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
  afterImage: {
    width: '68%',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 0.7,
    borderColor: Colors.secondary,
    borderRadius: 5,
  },
});

export default withLiveStatus;

/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated as RNAnimated, SafeAreaView} from 'react-native';
// import {useAuthStore} from '@state/authStore';
import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight} from '@utils/Scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StatusSearchBar from './StatusSearchBar';

const Notice_Height = -(NoticeHeight + 12);

const ProductDashboard = () => {
  // const {user} = useAuthStore();
  // console.log(user);
  const noticePosition = useRef(new RNAnimated.Value(Notice_Height)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: Notice_Height,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeOutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeOutId);
  }, []);

  return (
    <NoticeAnimation noticePostion={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />
        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeOutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeOutId);
              }}
            />
            <StatusSearchBar />
          </CollapsibleHeaderContainer>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
});

export default withCollapsibleContext(ProductDashboard);

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Animated as RNAnimated,
  SafeAreaView,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
// import {useAuthStore} from '@state/authStore';
import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight, screenHeight} from '@utils/Scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickSearchBar from './StickSearchBar';
import Content from '@components/dashboard/Content';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const Notice_Height = -(NoticeHeight + 12);

const ProductDashboard = () => {
  // const {user} = useAuthStore();
  // console.log(user);
  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef<number>(0);
  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300});

    previousScroll.current = scrollY.value;

    return {
      opacity,
      transform: [{translateY}],
    };
  });

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

        <Animated.View style={[styles.backToTopBtn, backToTopStyle]}>
          <TouchableOpacity
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}
            style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Icon
              name="arrow-up-circle-outline"
              color="white"
              size={RFValue(12)}
            />
            <CustomText
              variant="h9"
              style={{color: 'white'}}
              fontFamily={Fonts.SemiBold}>
              Back to top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>

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
            <StickSearchBar />
          </CollapsibleHeaderContainer>

          {/* scroll view */}
          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}>
            <Content />

            <View style={styles.text}>
              <CustomText
                fontFamily={Fonts.Bold}
                fontSize={RFValue(32)}
                style={styles.text1}>
                India's Last Minute App 🥭
              </CustomText>
              <CustomText fontFamily={Fonts.Bold} style={styles.text2}>
                Developed By ❤️ Amit Thakur
              </CustomText>
            </View>
          </CollapsibleScrollView>
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
  text: {
    backgroundColor: 'f8f8f8',
    padding: 20,
  },
  text1: {
    opacity: 0.2,
  },
  text2: {
    opacity: 0.2,
    marginTop: 10,
    paddingBottom: 100,
  },
  backToTopBtn: {
    position: 'absolute',
    alignSelf: 'center',
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 999,
  },
});

export default withCollapsibleContext(ProductDashboard);

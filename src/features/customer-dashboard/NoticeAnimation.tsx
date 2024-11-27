import Notice from '@components/dashboard/Notice';
import {NoticeHeight} from '@utils/Scaling';
import React, {FC, ReactElement} from 'react';
import {StyleSheet, View, Animated as RNAnimated} from 'react-native';

interface noticeAnimationProps {
  noticePostion: any;
  children: ReactElement;
}

const Notice_Height = -(NoticeHeight + 12);

const NoticeAnimation: FC<noticeAnimationProps> = ({
  noticePostion,
  children,
}) => {
  return (
    <View style={styles.container}>
      <RNAnimated.View
        style={[
          styles.noticeContainer,
          {transform: [{translateY: noticePostion}]},
        ]}>
        <Notice />
      </RNAnimated.View>

      <RNAnimated.View
        style={[
          styles.contentContainer,
          {
            paddingTop: noticePostion.interpolate({
              inputRange: [Notice_Height, 0],
              outputRange: [0, NoticeHeight + 20],
            }),
          },
        ]}>
        {children}
      </RNAnimated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  noticeContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 999,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default NoticeAnimation;

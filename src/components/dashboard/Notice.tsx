import React, {FC} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {NoticeHeight} from '@utils/Scaling';
import CustomText from '@components/ui/CustomText';
import {Fonts} from '@utils/Constants';
import Svg, {Defs, G, Path, Use} from 'react-native-svg';
import {wavyData} from '@utils/dummyData';

const Notice: FC = () => {
  return (
    <View style={{height: NoticeHeight}}>
      <View style={styles.container}>
        <View style={styles.noticeContainer}>
          <SafeAreaView style={styles.safeareaview}>
            {/* <Text>Notice</Text> */}
            <CustomText
              variant="h8"
              fontFamily={Fonts.SemiBold}
              style={styles.heading}>
              It's Raining Outside
            </CustomText>
            <CustomText
              variant="h9"
              fontFamily={Fonts.Light}
              style={styles.textCenter}>
              Our delivery partner take longer to reach you!
            </CustomText>
          </SafeAreaView>
        </View>
      </View>

      {/* wave like structure using svg */}
      <Svg
        width="100%"
        height="35"
        fill="#ccd5e4"
        viewBox="0 0 4000 1000"
        preserveAspectRatio="none"
        style={styles.wave}>
        <Defs>
          <Path id="wavePath" d={wavyData} />
        </Defs>
        <G>
          <Use href="#wavePath" y="321" />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccd5e4',
  },
  noticeContainer: {
    backgroundColor: '#ccd5e4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeareaview: {
    padding: 10,
  },
  heading: {
    color: '#2d3875',
    marginBottom: 8,
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
    marginBottom: 8,
  },
  wave: {
    width: '100%',
    transform: [{rotateX: '180deg'}],
  },
});

export default Notice;

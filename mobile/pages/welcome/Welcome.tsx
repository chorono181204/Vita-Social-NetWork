
import React, { useRef, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Button from '@/components/elements/Button/Button';
import { useRouter } from 'expo-router';
import { colors } from '@/theme';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = 420;
const WAVE_OFFSET = 40;

const TABS = [
  {
    title: `Let's connect\nwith each other`,
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
  },
  {
    title: 'Discover powerful features',
    subtitle: 'Track your health, book appointments, get medication reminders, and more!',
  },
  {
    title: 'Secure & synchronized data',
    subtitle: 'Your data is always safe and accessible anytime, anywhere.',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    position: 'relative',
    backgroundColor: colors.white,
    zIndex: 2,
    height: IMAGE_HEIGHT + WAVE_OFFSET,
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },
  svg: {
    position: 'absolute',
    top: IMAGE_HEIGHT - 10 + WAVE_OFFSET,
    left: 0,
    zIndex: 3,
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingTop: 64 + WAVE_OFFSET,
    alignItems: 'center',
    marginTop: -32,
    zIndex: 1,
  },
  scroll: {
    width: '100%',
    flexGrow: 0,
  },
  page: {
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-start', // Để text nằm phía trên
    // Không paddingTop ở đây
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.blackGray,
    textAlign: 'center',
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 24,
  },
  subtitle: {
    fontSize: 15,
    color: colors.gray,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 20,
    width: '100%',
    paddingHorizontal: 24,
  },
  indicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  indicatorActive: {
    width: 32,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.blackGray,
    marginRight: 8,
  },
  indicatorInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.lightGrayPurple,
    marginRight: 8,
  },
  button: {
    width: '70%',
    borderRadius: 16,
    marginTop: 8,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});

const Welcome = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    setActiveIndex(idx);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/3487797.jpg')}
          style={styles.image}
        />
        {/* SVG sóng lượn */}
        <Svg
          width={width}
          height={70}
          style={styles.svg}
          viewBox={`0 0 ${width} 70`}
        >
          {/* Sóng trắng */}
          <Path
            d={`M0,30 Q${width * 0.18},60 ${width * 0.32},40 Q${width * 0.45},20 ${width * 0.5},40 Q${width * 0.55},60 ${width * 0.68},40 Q${width * 0.82},20 ${width},40 L${width},70 L0,70 Z`}
            fill={colors.white}
          />
          {/* Viền xanh */}
          <Path
            d={`M0,30 Q${width * 0.18},60 ${width * 0.32},40 Q${width * 0.45},20 ${width * 0.5},40 Q${width * 0.55},60 ${width * 0.68},40 Q${width * 0.82},20 ${width},40`}
            fill="none"
            stroke={colors.green}
            strokeWidth={3}
          />
        </Svg>
      </View>
      {/* Content */}
      <View style={styles.content}>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.scroll}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {TABS.map((tab, idx) => (
            <View
              key={idx}
              style={styles.page}
            >
              <Text style={styles.title}>{tab.title}</Text>
              <Text style={styles.subtitle}>{tab.subtitle}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.indicatorRow}>
          {TABS.map((_, idx) =>
            idx === activeIndex ? (
              <View key={idx} style={styles.indicatorActive} />
            ) : (
              <View key={idx} style={styles.indicatorInactive} />
            )
          )}
        </View>
        <Button
          text="Get started"
          backgroundColor={colors.green}
          textColor={colors.white}
          height={52}
          roundSize="md"
          style={styles.button}
          textSize="base"
          textWeight="bold"
          onPress={() => router.push('/auth')}
        />
      </View>
    </View>
  );
};

export default Welcome; 
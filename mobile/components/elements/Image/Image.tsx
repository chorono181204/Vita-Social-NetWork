import React from 'react';
import { Image as ExpoImage, ImageContentFit, ImageProps as ExpoImageProps } from 'expo-image';
import { StyleProp, ImageStyle, ImageSourcePropType } from 'react-native';

export interface ImageProps extends Omit<ExpoImageProps, 'source' | 'placeholder' | 'style'> {
  source: ImageSourcePropType;
  placeholder?: ImageSourcePropType;
  contentFit?: ImageContentFit;
  transition?: number;
  style?: StyleProp<ImageStyle>;
  onTouchStart?: () => void;
}

export default function Image({
  transition = 0,
  contentFit = 'contain',
  ...imageProps
}: ImageProps) {
  return (
    <ExpoImage
      transition={transition}
      contentFit={contentFit}
      {...imageProps}
    />
  );
}

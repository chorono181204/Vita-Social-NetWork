import React, { useRef, memo, useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import RNBottomSheet, {
  BottomSheetProps as RNBottomSheetProps,
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  container: {
    width: '100%',
  },
});

export interface BottomSheetProps extends RNBottomSheetProps {
  isOpen: boolean;
  initialOpen?: boolean;
  children: React.ReactNode;
}

const BottomSheet = memo(function BottomSheet({
  children,
  isOpen,
  initialOpen,
  backgroundStyle,
  ...props
}: BottomSheetProps) {
  const bottomSheetRef = useRef<RNBottomSheet>(null);

  useEffect(() => {
    if (isOpen) bottomSheetRef.current?.snapToIndex(0);
    else bottomSheetRef.current?.close();
  }, [isOpen]);

  const renderBackdropComponent = (backdropProps: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} />
  );

  // Only render on mobile platforms
  if (Platform.OS === 'web') {
    return null;
  }

  return (
    <RNBottomSheet
      ref={bottomSheetRef}
      index={initialOpen ? 0 : -1}
      snapPoints={['50%']}
      enablePanDownToClose
      backdropComponent={renderBackdropComponent}
      backgroundStyle={backgroundStyle}
      {...props}>
      <BottomSheetScrollView contentContainerStyle={styles.container} style={styles.root}>
        {children}
      </BottomSheetScrollView>
    </RNBottomSheet>
  );
});

export default BottomSheet;

import Toast from 'react-native-toast-message';

export type ToastType = 'success' | 'error' | 'info';

export interface ShowToastOptions {
  type?: ToastType;
  text1: string;
  text2?: string;
  autoHide?: boolean;
  visibilityTime?: number;
  position?: 'top' | 'bottom';
}

export function showToast({
  type = 'success',
  text1,
  text2,
  autoHide = type !== 'info',
  visibilityTime = type === 'success' || type === 'error' ? 4000 : undefined,
  position = 'bottom',
}: ShowToastOptions) {
  Toast.hide();
  setTimeout(() => {
    Toast.show({
      type,
      text1,
      text2,
      position,
      autoHide,
      visibilityTime,
      text1Style: { fontSize: 16 },
      text2Style: { fontSize: 12 },
    });
  }, 300);
} 
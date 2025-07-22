import Toast from 'react-native-toast-message';

const BASE_DELAY = 300;

export const hide = () => Toast.hide();

export const showInfo = (title: string, message: string) => {
  Toast.hide();
  setTimeout(() => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      position: 'bottom',
      autoHide: false,
      text1Style: { fontSize: 16 },
      text2Style: { fontSize: 12 },
    });
  }, BASE_DELAY);
};

export const showSuccess = (title: string, message: string) => {
  Toast.hide();
  setTimeout(() => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      position: 'bottom',
      autoHide: true,
      visibilityTime: 4000,
      text1Style: { fontSize: 16 },
      text2Style: { fontSize: 12 },
    });
  }, BASE_DELAY);
};

export const showError = (title: string, message: string) => {
  Toast.hide();
  setTimeout(() => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      position: 'bottom',
      autoHide: true,
      visibilityTime: 4000,
      text1Style: { fontSize: 16 },
      text2Style: { fontSize: 12 },
    });
  }, BASE_DELAY);
};

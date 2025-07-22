import { Fragment, useState, useEffect } from 'react';
import CustomSplashScreen from '@/components/layouts/SplashScreen';
import { loadImages, loadFonts } from '@/theme';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Provider from '@/providers';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@/providers/AuthProvider';

function Router() {
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  // Preload assets (fonts/images) nếu cần
  useEffect(() => {
    async function preload() {
        await Promise.all([loadImages(), loadFonts()]);
      setShowCustomSplash(false);
    }
    preload();
  }, []);

  if (showCustomSplash) {
    return (
      <Fragment>
        <CustomSplashScreen onFinish={() => setShowCustomSplash(false)} />
        <StatusBar style="dark" />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Slot />
      <StatusBar style="light" />
    </Fragment>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider>
        <AuthProvider>
        <Router />
        </AuthProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

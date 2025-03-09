import { Stack } from "expo-router";
import { useEffect } from "react";
import { AuthProvider } from "../hooks/useAuth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen after a delay
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
          <Stack.Screen name="(app)" options={{ animation: "fade" }} />
          <Stack.Screen name="+not-found" options={{ animation: "fade" }} />
        </Stack>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

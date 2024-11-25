import { tokenCache } from "@/common/utils/tokenCache";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { DMSans_400Regular, DMSans_500Medium, DMSans_700Bold, useFonts } from "@expo-google-fonts/dm-sans";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@/common/utils/unistyles";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Missing Publishable Key. Please set it in your .env");
}

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <InitialLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}

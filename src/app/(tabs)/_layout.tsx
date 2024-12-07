import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UnistylesRuntime, useStyles } from "react-native-unistyles";
import { useAuth } from "@clerk/clerk-expo";
import { LogoutButton, ThemeButton } from "@/ui/components";

export default function TabLayout() {
  const { theme } = useStyles();
  const { signOut, isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.text,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarStyle: { backgroundColor: theme.colors.background, paddingTop: theme.dimensions.size_8 },
        headerStyle: { backgroundColor: theme.colors.background },
        headerLeftContainerStyle: { paddingHorizontal: theme.dimensions.size_8 },
        headerRightContainerStyle: { paddingHorizontal: theme.dimensions.size_8 },
        headerTitleStyle: { color: theme.colors.text },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Log in",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
          headerLeft: () => (
            <ThemeButton
              onPress={() => UnistylesRuntime.setTheme(UnistylesRuntime.themeName === "dark" ? "light" : "dark")}
              iconName={UnistylesRuntime.themeName === "dark" ? "sunny-outline" : "moon-outline"}
            />
          ),
          headerRight: () => (isSignedIn ? <LogoutButton onPress={() => signOut()} /> : null),
        }}
      />
    </Tabs>
  );
}

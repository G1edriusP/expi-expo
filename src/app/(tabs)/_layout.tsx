import { Tabs, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useStyles } from "react-native-unistyles";
import { useAuth } from "@clerk/clerk-expo";
import { LogoutButton } from "@/ui/components";

export default function TabLayout() {
  const { theme } = useStyles();
  const { signOut } = useAuth();

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: theme.colors.text }}>
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
          headerRight: () => <LogoutButton onPress={() => signOut()} />,
        }}
      />
    </Tabs>
  );
}

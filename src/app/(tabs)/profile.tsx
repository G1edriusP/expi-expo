import { Image, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useAuth, useOAuth } from "@clerk/clerk-expo";

import { Button } from "@/ui/components";
import { useCallback, useEffect } from "react";
import { useUserProfile } from "@/common/utils/hooks/useUserProfile";
import { useNavigation } from "expo-router";

const Profile = () => {
  const { styles } = useStyles(stylesheet);
  const { isSignedIn } = useAuth();
  const user = useUserProfile();
  const navigation = useNavigation();
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleLogin = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigation.setOptions({ title: "Log in" });
    } else {
      navigation.setOptions({ title: `${user.firstName} ${user.lastName}` });
    }
  }, [user]);

  if (!isSignedIn) {
    return (
      <View style={styles.loginContainer}>
        <Button title="Login with Google" onPress={handleGoogleLogin} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!user ? null : (
        <>
          <Image source={{ uri: user.imageUrl }} style={styles.imageContainer} />
          <Text style={styles.subText}>{user.email}</Text>
        </>
      )}
    </View>
  );
};

export default Profile;

const stylesheet = createStyleSheet((theme) => ({
  loginContainer: {
    flex: 1,
    padding: theme.dimensions.size_24,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: theme.dimensions.size_24,
    backgroundColor: theme.colors.background,
    alignItems: "center",
    gap: theme.dimensions.size_24,
  },
  imageContainer: {
    width: theme.dimensions.size_64 * 2,
    height: theme.dimensions.size_64 * 2,
    borderRadius: theme.dimensions.size_24,
  },
  profileInfoContainer: {
    gap: theme.dimensions.size_24,
  },
  title: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.dimensions.size_24,
  },
  subText: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.dimensions.size_16,
  },
}));

import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useOAuth } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";

import { Button } from "@/ui/components";

const Index = () => {
  const { styles } = useStyles(stylesheet);
  const { startOAuthFlow: startGoogleOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const data = useQuery(api.users.getAllUsers);
  console.log("🚀 ~ Index ~ data:", data);

  const handleGoogleLogin = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuthFlow();
      console.log("🚀 ~ handleGoogleLogin ~ createdSessionId:", createdSessionId);
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (error) {
      // TODO: Handle error
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Login with Google" onPress={handleGoogleLogin} />
    </View>
  );
};

export default Index;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
}));

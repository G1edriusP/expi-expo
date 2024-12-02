import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Ionicons from "@expo/vector-icons/Ionicons";

interface LogoutButtonProps {
  onPress: () => void;
}

const LogoutButton = (props: LogoutButtonProps) => {
  const { onPress } = props;
  const { styles, theme } = useStyles(stylesheet);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="log-out-outline" size={theme.dimensions.size_24} color={theme.colors.text} />
    </TouchableOpacity>
  );
};

export default LogoutButton;

const stylesheet = createStyleSheet((theme) => ({
  container: {},
}));

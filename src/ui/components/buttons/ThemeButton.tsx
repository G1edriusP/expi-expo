import { TouchableOpacity } from "react-native";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Ionicons from "@expo/vector-icons/Ionicons";

interface ThemeButtonProps {
  onPress: () => void;
  iconName: "sunny-outline" | "moon-outline";
}

const ThemeButton = (props: ThemeButtonProps) => {
  const { onPress, iconName = "moon-outline" } = props;
  const { styles, theme } = useStyles(stylesheet);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={iconName} size={theme.dimensions.size_24} color={theme.colors.text} />
    </TouchableOpacity>
  );
};

export default ThemeButton;

const stylesheet = createStyleSheet((theme) => ({
  container: {},
}));

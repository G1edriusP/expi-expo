import { memo, useMemo } from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary";
}

const Button = memo((props: ButtonProps) => {
  const { title, onPress, type = "primary" } = props;
  const { styles } = useStyles(stylesheet);

  const getButtonStyles = useMemo(
    () => (): { containerStyle: ViewStyle; textStyle: TextStyle } => {
      switch (type) {
        case "primary":
          return {
            containerStyle: styles.containerPrimary,
            textStyle: styles.textPrimary,
          };
        case "secondary":
          return {
            containerStyle: styles.containerSecondary,
            textStyle: styles.textSecondary,
          };
      }
    },
    []
  );

  return (
    <TouchableOpacity onPress={onPress} style={getButtonStyles().containerStyle}>
      <Text style={getButtonStyles().textStyle}>{title}</Text>
    </TouchableOpacity>
  );
});

export default Button;

const stylesheet = createStyleSheet((theme) => ({
  containerPrimary: {
    backgroundColor: theme.colors.primary,
    padding: theme.dimensions.size_16,
    borderRadius: theme.dimensions.size_8,
    alignItems: "center",
    justifyContent: "center",
  },
  containerSecondary: {
    backgroundColor: theme.colors.secondary,
    padding: theme.dimensions.size_16,
    borderRadius: theme.dimensions.size_8,
    alignItems: "center",
    justifyContent: "center",
  },
  textPrimary: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.dimensions.size_16,
    color: theme.colors.background,
  },
  textSecondary: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.dimensions.size_16,
    color: theme.colors.text,
  },
}));

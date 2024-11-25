import { UnistylesRegistry } from "react-native-unistyles";

import { darkTheme } from "@/ui/styles/themes/darkTheme";
import { lightTheme } from "@/ui/styles/themes/lightTheme";

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({
  light: lightTheme,
  dark: darkTheme,
}).addConfig({
  initialTheme: "light",
  adaptiveThemes: true,
});

import { Dimensions } from "react-native";

// Pre-defined value of large device
const MAX_WIDTH = 428;

export const scale = (size: number) => {
  const screenWidth = Dimensions.get("window").width;
  return Math.floor(size * (screenWidth / MAX_WIDTH));
};

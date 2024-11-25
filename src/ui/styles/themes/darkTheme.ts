import { dimensions } from "@/common/data/constants/app/dimensions";
import { fonts } from "@/common/data/constants/app/fonts";
import { scale } from "@/common/utils/scale";

export const darkTheme = {
  colors: {
    text: "#EBE9FC",
    background: "#010104",
    primary: "#3A31D8",
    secondary: "#020024",
    accent: "#0600C2",
  },
  dimensions: {
    size_1: scale(dimensions.size_1),
    size_2: scale(dimensions.size_2),
    size_4: scale(dimensions.size_4),
    size_8: scale(dimensions.size_8),
    size_12: scale(dimensions.size_12),
    size_16: scale(dimensions.size_16),
    size_24: scale(dimensions.size_24),
    size_32: scale(dimensions.size_32),
    size_48: scale(dimensions.size_48),
    size_64: scale(dimensions.size_64),
  },
  fonts: {
    regular: fonts.regular,
    medium: fonts.medium,
    bold: fonts.bold,
  },
} as const;

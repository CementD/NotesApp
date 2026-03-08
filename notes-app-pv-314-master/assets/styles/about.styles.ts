import { StyleSheet } from "react-native";
import { ColorScheme } from "@/hooks/useTheme";

export const createAboutStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.bg,
    },

    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },

    card: {
      borderRadius: 20,
      padding: 24,
      alignItems: "center",
    },

    iconContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16,
      backgroundColor: colors.primary,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10,
    },

    description: {
      fontSize: 16,
      textAlign: "center",
      color: colors.textMuted,
      lineHeight: 22,
    },

    separator: {
      height: 1,
      width: "100%",
      backgroundColor: colors.border,
      marginVertical: 18,
    },

    version: {
      fontSize: 14,
      color: colors.textMuted,
    },

    author: {
      fontSize: 14,
      color: colors.textMuted,
      marginTop: 4,
    },
  });
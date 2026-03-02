import { Text, StyleSheet } from "react-native";
import useTheme, { ColorScheme } from "@/hooks/useTheme";

export function Title({ text }: { text: string }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return <Text style={styles.title}>{text}</Text>;
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
      textAlign: "center",
      color: colors.text,
    },
  });
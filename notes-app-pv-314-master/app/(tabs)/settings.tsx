import useTheme, { ColorScheme } from "@/hooks/useTheme";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Theme: {isDarkMode ? "Dark" : "Light"}
        </Text>

        <TouchableOpacity onPress={toggleDarkMode} style={styles.button}>
          <Text style={styles.buttonText}>Toggle Theme</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.bg,
    },
    text: {
      color: colors.text,
      fontSize: 18,
      marginBottom: 12,
    },
    button: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 6,
    },
    buttonText: {
      color: colors.surface,
      textAlign: "center",
      fontWeight: "bold",
    },
  });
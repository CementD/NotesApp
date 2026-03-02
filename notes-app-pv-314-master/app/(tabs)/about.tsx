import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme, { ColorScheme } from "@/hooks/useTheme";

export default function AboutScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={styles.container}>
        <Text style={styles.text}>About Us</Text>
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
    },
  });
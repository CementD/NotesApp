import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { createAboutStyles } from "@/assets/styles/about.styles";

export default function AboutScreen() {
  const { colors } = useTheme();
  const styles = createAboutStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <LinearGradient
          colors={colors.gradients.background}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.iconContainer}>
            <AntDesign name="info-circle" size={40} color="#fff" />
          </View>

          <Text style={styles.title}>Notes App</Text>

          <Text style={styles.description}>
            Simple and elegant todo application built with React Native and
            Convex backend. You can create, edit, complete and delete notes
            easily.
          </Text>

          <View style={styles.separator} />

          <Text style={styles.version}>Version 1.0</Text>
          <Text style={styles.author}>Made with ❤️ using React Native</Text>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}
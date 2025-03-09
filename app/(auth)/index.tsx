import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useAuth } from "../../hooks/useAuth";
import Input from "@/components/global/Input";
import Button from "@/components/global/Button";

export default function LoginScreen() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoading } = useAuth();

  const handleLogin = async () => {
    await signIn({ studentId, password });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View
          style={styles.logoContainer}
          entering={FadeIn.delay(300).duration(800)}
        >
          <Image
            source={require("../../assets/images/react-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>Log-It</Text>
        </Animated.View>

        <Animated.View
          style={styles.formContainer}
          entering={FadeInDown.delay(400).duration(800)}
        >
          <Input
            label="Student ID"
            value={studentId}
            onChangeText={setStudentId}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            isPassword
          />

          <Button
            title="Login"
            onPress={handleLogin}
            style={styles.loginButton}
          />

          <Link href="/forgotPassword" asChild>
            <Button
              title="Forgot Password?"
              onPress={() => {}}
              isSecondary
              style={styles.forgotButton}
            />
          </Link>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  loginButton: {
    marginTop: 20,
  },
  forgotButton: {
    marginTop: 10,
  },
});

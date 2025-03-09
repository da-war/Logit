import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import Input from "@/components/global/Input";
import Button from "@/components/global/Button";

export default function ForgotPasswordScreen() {
  const [studentId, setStudentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true);

    // Return to login after a delay
    setTimeout(() => {
      router.back();
    }, 3000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animated.View
          style={styles.header}
          entering={FadeIn.delay(300).duration(800)}
        >
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your student ID and we'll send you a password reset link
          </Text>
        </Animated.View>

        <Animated.View
          style={styles.formContainer}
          entering={FadeInDown.delay(400).duration(800)}
        >
          {isSuccess ? (
            <View style={styles.successContainer}>
              <Text style={styles.successText}>
                Password reset email sent! Check your inbox.
              </Text>
              <Text style={styles.successSubtext}>Redirecting to login...</Text>
            </View>
          ) : (
            <>
              <Input
                label="Student ID"
                value={studentId}
                onChangeText={setStudentId}
              />

              <Button
                title="Reset Password"
                onPress={handleResetPassword}
                isLoading={isLoading}
                style={styles.resetButton}
              />

              <Button
                title="Back to Login"
                onPress={() => router.back()}
                isSecondary
                style={styles.backButton}
              />
            </>
          )}
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
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  resetButton: {
    marginTop: 20,
  },
  backButton: {
    marginTop: 10,
  },
  successContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f9ff",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#0284c7",
  },
  successText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0284c7",
    marginBottom: 8,
  },
  successSubtext: {
    fontSize: 14,
    color: "#666",
  },
});

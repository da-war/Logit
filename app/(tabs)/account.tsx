import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

import { useAuth } from "../../hooks/useAuth";
import Input from "@/components/global/Input";
import RadioButton from "@/components/global/RadioButton";
import Button from "@/components/global/Button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AccountScreen() {
  const { user, updateUser, signOut, isLoading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [practicum, setPracticum] = useState(user?.practicum || "");
  const [isGraduate, setIsGraduate] = useState(user?.isGraduate || false);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!firstName.trim() || !lastName.trim() || !practicum.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSaving(true);

    // Update user data
    await updateUser({
      firstName,
      lastName,
      practicum,
      isGraduate,
    });

    setIsSaving(false);
    setIsEditing(false);
  };

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: signOut,
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.Text
            style={styles.title}
            entering={FadeIn.delay(200).duration(500)}
          >
            {isEditing ? "Update Account Details" : "Account Details"}
          </Animated.Text>

          <Animated.View
            style={styles.formCard}
            entering={FadeInUp.delay(300).duration(500)}
          >
            <Input
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
              disabled={!isEditing}
              placeholder="Enter your first name"
            />

            <Input
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
              disabled={!isEditing}
              placeholder="Enter your last name"
            />

            <Input
              label="Email"
              value={user?.email || ""}
              onChangeText={() => {}}
              disabled={true}
              placeholder="Enter your email (locked)"
            />

            <Input
              label="Student ID"
              value={user?.id || ""}
              onChangeText={() => {}}
              disabled={true}
              placeholder="Enter your student ID (locked)"
            />

            <Input
              label="Practicum"
              value={practicum}
              onChangeText={setPracticum}
              disabled={!isEditing}
              placeholder="Enter your practicum"
            />

            <View style={styles.radioContainer}>
              <Text style={styles.radioLabel}>Academic Level</Text>
              <View style={styles.radioGroup}>
                <RadioButton
                  label="Undergraduate"
                  isSelected={!isGraduate}
                  onSelect={() => isEditing && setIsGraduate(false)}
                />
                <RadioButton
                  label="Graduate"
                  isSelected={isGraduate}
                  onSelect={() => isEditing && setIsGraduate(true)}
                />
              </View>
            </View>

            {isEditing ? (
              <Button
                title="Update"
                onPress={handleUpdate}
                isLoading={isSaving}
                style={styles.updateButton}
              />
            ) : (
              <Button
                title="Edit"
                onPress={handleEdit}
                style={styles.editButton}
              />
            )}

            <Button
              title="Sign Out"
              onPress={handleSignOut}
              isLoading={isLoading}
              isSecondary
              style={styles.signOutButton}
            />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  radioGroup: {
    marginTop: 8,
  },
  editButton: {
    marginTop: 16,
  },
  updateButton: {
    marginTop: 16,
  },
  signOutButton: {
    marginTop: 10,
  },
});

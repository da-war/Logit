import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { useAuth } from "../../hooks/useAuth";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "@/components/global/Button";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LogScreen() {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [startTime, setStartTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);

  const [endTime, setEndTime] = useState(
    new Date(Date.now() + 2 * 60 * 60 * 1000)
  ); // 2 hours later
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const calculatedHours = (
    (endTime.getTime() - startTime.getTime()) /
    (1000 * 60 * 60)
  ).toFixed(1);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event: any, selectedTime?: Date) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(selectedTime);

      // If end time is before the new start time, adjust it
      if (endTime <= selectedTime) {
        const newEndTime = new Date(selectedTime.getTime() + 60 * 60 * 1000); // 1 hour later
        setEndTime(newEndTime);
      }
    }
  };

  const handleEndTimeChange = (event: any, selectedTime?: Date) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true);

    // Reset form after a delay
    setTimeout(() => {
      setDate(new Date());
      setStartTime(new Date());
      setEndTime(new Date(Date.now() + 2 * 60 * 60 * 1000));
      setDescription("");
      setIsSuccess(false);
    }, 3000);
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
            Log Your Practicum Time
          </Animated.Text>

          <Animated.View
            style={styles.formCard}
            entering={FadeInUp.delay(300).duration(500)}
          >
            {isSuccess ? (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>
                  Time log successfully submitted!
                </Text>
                <Text style={styles.successSubtext}>
                  {calculatedHours} hours have been added to your total.
                </Text>
              </View>
            ) : (
              <>
                {/* Date Input */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Date</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.dateText}>{formatDate(date)}</Text>
                  </TouchableOpacity>

                  {showDatePicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                </View>

                {/* Start Time Input */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Start Time</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowStartTimePicker(true)}
                  >
                    <Text style={styles.dateText}>{formatTime(startTime)}</Text>
                  </TouchableOpacity>

                  {showStartTimePicker && (
                    <DateTimePicker
                      value={startTime}
                      mode="time"
                      display="default"
                      onChange={handleStartTimeChange}
                    />
                  )}
                </View>

                {/* End Time Input */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>End Time</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowEndTimePicker(true)}
                  >
                    <Text style={styles.dateText}>{formatTime(endTime)}</Text>
                  </TouchableOpacity>

                  {showEndTimePicker && (
                    <DateTimePicker
                      value={endTime}
                      mode="time"
                      display="default"
                      onChange={handleEndTimeChange}
                      minimumDate={startTime}
                    />
                  )}
                </View>

                {/* Hours Calculation */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>
                    Hours Spent (auto-calculated)
                  </Text>
                  <View style={styles.calculatedContainer}>
                    <Text style={styles.calculatedHours}>
                      {calculatedHours}
                    </Text>
                  </View>
                </View>

                {/* Description Input */}
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    style={styles.textArea}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Brief description of activities"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                <Button
                  title="Submit Log"
                  onPress={handleSubmit}
                  isLoading={isLoading}
                  style={styles.submitButton}
                />
              </>
            )}
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
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#f9f9f9",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  calculatedContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#f0f0f0",
  },
  calculatedHours: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#D02445",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    minHeight: 100,
    fontSize: 16,
  },
  submitButton: {
    marginTop: 8,
  },
  successContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f9f0",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#22c55e",
  },
  successText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#22c55e",
    marginBottom: 8,
  },
  successSubtext: {
    fontSize: 14,
    color: "#666",
  },
});

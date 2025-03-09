import { View, TextInput, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { useState } from "react";

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  isPassword?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export default function Input({
  label,
  value,
  onChangeText,
  isPassword = false,
  placeholder = "",
  disabled = false,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnim.value = withTiming(1, { duration: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (value === "") {
      focusAnim.value = withTiming(0, { duration: 200 });
    }
  };

  const labelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            focusAnim.value,
            [0, 1],
            [0, -25],
            Extrapolate.CLAMP
          ),
        },
        {
          scale: interpolate(
            focusAnim.value,
            [0, 1],
            [1, 0.85],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      {(isFocused || value !== "") && (
        <Animated.Text style={[styles.label, labelStyle]}>
          {label}
        </Animated.Text>
      )}
      <TextInput
        style={[styles.input, disabled ? styles.disabledInput : {}]}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={isPassword}
        placeholder={!isFocused && value === "" ? placeholder || label : ""}
        placeholderTextColor="#aaa"
        editable={!disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 0,
    top: 38,
    fontSize: 14,
    color: "#666",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    color: "#333",
  },
  disabledInput: {
    color: "#999",
    backgroundColor: "#f7f7f7",
  },
});

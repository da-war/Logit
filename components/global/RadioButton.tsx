import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";

interface RadioButtonProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
}

export default function RadioButton({
  label,
  isSelected,
  onSelect,
}: RadioButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const outerCircleStyle = useAnimatedStyle(() => {
    return {
      borderColor: isSelected ? "#D02445" : "#ddd",
      transform: [{ scale: scale.value }],
    };
  }, [isSelected]);

  const innerCircleStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isSelected ? 1 : 0, { duration: 150 }),
      transform: [{ scale: withTiming(isSelected ? 1 : 0, { duration: 150 }) }],
    };
  }, [isSelected]);

  const handlePressIn = () => {
    scale.value = withTiming(0.9, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <Pressable
      style={styles.container}
      onPress={onSelect}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.outerCircle, outerCircleStyle]}>
        <Animated.View style={[styles.innerCircle, innerCircleStyle]} />
      </Animated.View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#D02445",
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
});

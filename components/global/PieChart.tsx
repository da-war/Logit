import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedProps,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import { Svg, Path, G, Circle } from "react-native-svg";
import { useEffect } from "react";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface PieChartProps {
  progress: number;
  total: number;
}

export default function PieChart({ progress, total }: PieChartProps) {
  const percentage = Math.min(100, Math.round((progress / total) * 100));
  const animatedPercentage = useSharedValue(0);

  // Calculate the coordinates for the pie slice
  const calculatePath = (percent: number) => {
    if (percent <= 0) return "";
    if (percent >= 100) {
      // Full circle
      return "M 50 50 m 0 -50 a 50 50 0 1 1 0 100 a 50 50 0 1 1 0 -100";
    }

    const radius = 50;
    const center = { x: 50, y: 50 };
    const angle = (percent / 100) * 360;

    // Convert angle to radians, adjust starting point to top (negative 90 degrees)
    const angleRad = ((angle - 90) * Math.PI) / 180;

    // Calculate end point
    const endX = center.x + radius * Math.cos(angleRad);
    const endY = center.y + radius * Math.sin(angleRad);

    // Determine if angle is greater than 180 degrees
    const largeArcFlag = angle > 180 ? 1 : 0;

    // Create the SVG path
    return `M ${center.x} ${center.y} L ${center.x} ${
      center.y - radius
    } A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  const animatedProps = useAnimatedProps(() => {
    return {
      d: calculatePath(animatedPercentage.value),
    };
  });

  useEffect(() => {
    // Animate the percentage when the component mounts or when percentage changes
    animatedPercentage.value = withTiming(percentage, { duration: 1000 });
  }, [percentage]);

  return (
    <View style={styles.container}>
      <Svg height="100" width="100" viewBox="0 0 100 100">
        <G>
          {/* Background circle */}
          <Circle cx="50" cy="50" r="50" fill="#f0f0f0" />

          {/* Progress slice */}
          <AnimatedPath animatedProps={animatedProps} fill="#D02445" />
        </G>
      </Svg>

      <View style={styles.textContainer}>
        <Text style={styles.percentText}>{percentage}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  percentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

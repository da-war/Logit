import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { useAuth } from "../../hooks/useAuth";
import { useMemo } from "react";
import { PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

const mockLogs = [
  {
    date: "September 10, 2023",
    hours: 5,
    activity: "Classroom Observation",
  },
  {
    date: "September 8, 2023",
    hours: 4,
    activity: "Lesson Planning",
  },
  {
    date: "September 6, 2023",
    hours: 6,
    activity: "Student Tutoring",
  },
  {
    date: "September 4, 2023",
    hours: 3,
    activity: "Faculty Meeting",
  },
  {
    date: "September 1, 2023",
    hours: 5,
    activity: "Teaching",
  },
];

const Index = () => {
  const { user } = useAuth();
  const screenWidth = Dimensions.get("window").width;

  const { totalHours, goalHours, remainingHours } = useMemo(() => {
    // Calculate total hours from logs
    const actual = mockLogs.reduce((sum, log) => sum + log.hours, 0);

    // Return predetermined values (as in your original code)
    return {
      totalHours: 120, // Fixed value as per design
      goalHours: 200,
      remainingHours: 200 - 120, // Calculate remaining hours
    };
  }, []);

  // Prepare data for PieChart
  const chartData = [
    {
      name: "Completed",
      hours: totalHours,
      color: "#D02445",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Remaining",
      hours: remainingHours,
      color: "#f0f0f0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  // Chart configuration
  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Animated.Text
            style={styles.title}
            entering={FadeIn.delay(200).duration(500)}
          >
            Progress Summary
          </Animated.Text>

          <Animated.View
            style={styles.chartCard}
            entering={FadeInUp.delay(300).duration(500)}
          >
            <View style={styles.chartRow}>
              <View style={styles.chartContainer}>
                <PieChart
                  data={chartData}
                  width={120}
                  height={120}
                  chartConfig={chartConfig}
                  accessor="hours"
                  backgroundColor="transparent"
                  paddingLeft="0"
                  absolute
                  hasLegend={false}
                />
                <Text style={styles.centerPercentage}>
                  {Math.round((totalHours / goalHours) * 100)}%
                </Text>
              </View>
              <View style={styles.chartInfo}>
                <Text style={styles.chartInfoText}>
                  Completed Hours:{" "}
                  <Text style={styles.highlight}>{totalHours}</Text>
                </Text>
                <Text style={styles.chartInfoText}>
                  Goal: <Text style={styles.highlight}>{goalHours} Hours</Text>
                </Text>
              </View>
            </View>
          </Animated.View>

          <Animated.Text
            style={[styles.title, styles.logsTitle]}
            entering={FadeIn.delay(400).duration(500)}
          >
            Previously Logged Hours
          </Animated.Text>

          {mockLogs.map((log, index) => (
            <Animated.View
              key={`${log.date}-${index}`}
              style={styles.logCard}
              entering={FadeInUp.delay(500 + index * 100).duration(500)}
            >
              <View>
                <Text style={styles.logDate}>Date: {log.date}</Text>
                <Text style={styles.logDetail}>Hours: {log.hours}</Text>
                <Text style={styles.logDetail}>Activity: {log.activity}</Text>
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

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
  logsTitle: {
    marginTop: 24,
    marginBottom: 8,
  },
  chartCard: {
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
  chartRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  chartContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  centerPercentage: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  chartInfo: {
    marginLeft: 20,
    flex: 1,
  },
  chartInfoText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  highlight: {
    fontWeight: "bold",
    color: "#D02445",
  },
  logCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  logDetail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});

export default Index;

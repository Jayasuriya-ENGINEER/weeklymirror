import { View, Text, StyleSheet } from "react-native";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

export default function WeekTracker() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This Week</Text>

      <View style={styles.row}>
        {days.map((day) => (
          <View key={day} style={styles.dayBox}>
            <Text>{day}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dayBox: {
    backgroundColor: "#EFE6DA",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
});

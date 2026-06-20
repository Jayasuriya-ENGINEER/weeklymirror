import { View, Text, StyleSheet } from "react-native";

import { useMemoryStore } from "../../stores/memoryStore";

export default function MemoryFeed() {
  const memories = useMemoryStore((state) => state.memories);

  return (
    <View>
      <Text style={styles.title}>Todays Memories</Text>

      {memories.map((memory) => (
        <View key={memory.id} style={styles.card}>
          <Text>{memory.note}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },

  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
});

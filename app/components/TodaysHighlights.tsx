import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";

import { useAuthStore } from "../../stores/authStore";
import { useMemoryStore } from "../../stores/memoryStore";

import { getMemoriesByDate, deleteMemory, updateMemory} from "../../services/memoryService";

interface Memory {
  id: string;
  content: string;
  image_url?: string;
  memory_date: string;
}

export default function TodaysHighlights() {
  const user = useAuthStore((state) => state.user);

  const refreshKey = useMemoryStore((state) => state.refreshKey);

  const triggerRefresh = useMemoryStore((state) => state.triggerRefresh);

  const [memories, setMemories] = useState<Memory[]>([]);
  const [editVisible, setEditVisible] = useState(false);

  const [editingMemoryId, setEditingMemoryId] = useState<string | null>(null);

  const [editText, setEditText] = useState("");

  useEffect(() => {
    loadTodayMemories();
  }, [refreshKey]);

  const loadTodayMemories = async () => {
    if (!user) return;

    const today = new Date();

    const memoryDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const { data, error } = await getMemoriesByDate(user.id, memoryDate);

    if (error) {
      console.log(error);
      return;
    }

    setMemories(data || []);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Memory", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const { error } = await deleteMemory(id);

          if (error) {
            Alert.alert("Error", error.message);
            return;
          }

          triggerRefresh();
        },
      },
    ]);
  };


    const handleEdit = (memoryId: string, currentContent: string) => {
      setEditingMemoryId(memoryId);

      setEditText(currentContent);

      setEditVisible(true);
    };


const handleUpdate = async () => {
  if (!editingMemoryId) return;

  const { error } = await updateMemory(editingMemoryId, editText);

  if (error) {
    Alert.alert("Error", error.message);
    return;
  }

  setEditVisible(false);

  setEditingMemoryId(null);

  setEditText("");

  triggerRefresh();
};

  if (memories.length === 0) {
    return null;
  }



  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todays Highlights</Text>

      {memories.map((memory) => (
        <View key={memory.id} style={styles.card}>
          {memory.image_url && (
            <Image
              source={{
                uri: memory.image_url,
              }}
              style={styles.image}
            />
          )}

          <Text style={styles.content}>{memory.content}</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEdit(memory.id, memory.content)}
            >
              <Text>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(memory.id)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal visible={editVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Memory</Text>

            <TextInput
              value={editText}
              onChangeText={setEditText}
              multiline
              style={styles.modalInput}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setEditVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleUpdate}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },

  content: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    gap: 12,
  },

  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalCard: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },

  modalInput: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 12,
    textAlignVertical: "top",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

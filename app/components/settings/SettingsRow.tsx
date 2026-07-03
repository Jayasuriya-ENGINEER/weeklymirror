import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";


interface Props {
  icon: any;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

export default function SettingsRow({ icon, title, subtitle, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons name={icon} size={22} color="#A98B5E" />

        <View style={{ marginLeft: 14 }}>
          <Text style={styles.title}>{title}</Text>

          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#AAA" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
  },

  subtitle: {
    marginTop: 3,
    color: "#777",
    fontSize: 13,
  },
});

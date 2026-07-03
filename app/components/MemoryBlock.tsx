import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

interface Props {
  content: string;

  images: string[];
}




export default function MemoryBlock({ content, images }: Props) {
  return (
    <View style={styles.container}>
      {images.length === 1 && (
        <Image source={{ uri: images[0] }} style={styles.heroImage} />
      )}

      <Text style={styles.body}>{content}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
  },

  heroImage: {
    width: "100%",

    height: 220,

    borderRadius: 12,

    marginBottom: 18,
  },

  title: {
    fontSize: 24,

    fontWeight: "700",

    color: "#222",

    lineHeight: 30,
  },

  body: {
    marginTop: 12,

    fontSize: 17,

    color: "#555",

    lineHeight: 30,
  },
  
});

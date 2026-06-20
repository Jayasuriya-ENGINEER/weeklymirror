import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

import GreetingCard from "../components/GreetingCard";
import DateCard from "../components/DateCard";
import WeekTracker from "../components/WeekTracker";
import CaptureCard from '../components/CaptureCard';  
import MemoryFeed from '../components/MemoryFeed';

import { ScrollView } from "react-native";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        <GreetingCard />
        <DateCard />
        <CaptureCard />
        <MemoryFeed />
        <WeekTracker />
      </ScrollView>
    </SafeAreaView>
  );
}

export default index

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40
  }
});


import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";

import GreetingCard from "../components/GreetingCard";
import DateCard from "../components/DateCard";
import WeekTracker from "../components/WeekTracker";
import CaptureCard from '../components/CaptureCard';  
import TodaysHighlights from "../components/TodaysHighlights";
import { useAuthStore } from "../../stores/authStore";
import { ScrollView } from "react-native";
import StreakCard from '../components/StreakCard';



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
        <StreakCard />
        <CaptureCard />
        <TodaysHighlights />

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


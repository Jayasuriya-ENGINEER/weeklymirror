import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import WeeklyEditionCard from "../components/WeeklyEditionCard";
import { Ionicons } from "@expo/vector-icons";

//the following imports for weekly edition card
import { Edition } from "../../type/edition";
import { useEffect} from "react";

import { useAuthStore } from "../../stores/authStore";

import PublishEditionModal from "../components/PublishEditionModal";
import {getEditions} from "../../services/editionService";
import CircularMonthPicker from "../components/CircularMonthPicker";
import { isFutureMonth } from "@/utils/rackUtils";



import { useFocusEffect } from "@react-navigation/native";


export default function Rack() {
  const router = useRouter();
  const [year, setYear] = useState(new Date().getFullYear());

  const [month, setMonth] = useState(new Date().getMonth());

  const [editions, setEditions] = useState<Edition[]>([]);

  const user = useAuthStore((state) => state.user);

  const loadEditions = async () => {
    if (!user) return;

   const { data, error } = await getEditions(user.id, month + 1, year);

   if (error) {
     console.log(error);
     return;
   }

   setEditions(data || []);
  };

 useFocusEffect(
   React.useCallback(() => {
     loadEditions();
   }, [month, year, user]),
 );


const [selectedEdition, setSelectedEdition] = useState<any>(null);

const [publishVisible, setPublishVisible] = useState(false);
const future = isFutureMonth(month, year);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 180,
      }}
    >
      <View style={styles.yearRow}>
        <TouchableOpacity onPress={() => setYear((y) => y - 1)}>
          <Ionicons name="chevron-back" size={24} color="#222" />
        </TouchableOpacity>

        <Text style={styles.year}>{year}</Text>

        <TouchableOpacity onPress={() => setYear((y) => y + 1)}>
          <Ionicons name="chevron-forward" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Month</Text>

      <CircularMonthPicker
        selectedMonth={month}
        selectedYear={year}
        onSelectMonth={setMonth}
      />
      <Text style={styles.sectionTitle}>Editions</Text>

      {future && editions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="sparkles-outline" size={52} color="#C8A25A" />

          <Text style={styles.emptyTitle}>Not written yet</Text>

          <Text style={styles.emptySubtitle}>
            This month hasn't happened yet.
            {"\n\n"}
            Keep capturing memories — they'll appear here when the week arrives.
          </Text>
        </View>
      ) : editions.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="book-outline" size={52} color="#C8A25A" />

          <Text style={styles.emptyTitle}>No editions yet</Text>

          <Text style={styles.emptySubtitle}>
            Start capturing memories during this month.
            {"\n\n"}
            Your weekly editions will appear here automatically.
          </Text>
        </View>
      ) : (
        editions.map((edition) => (
          <WeeklyEditionCard
            key={edition.id}
            id={edition.id}
            issueNumber={edition.issue_number}
            startDate={edition.start_date}
            endDate={edition.end_date}
            capturedDays={edition.captured_days}
            status={edition.status}
            onPublish={() => {
              setSelectedEdition(edition);
              setPublishVisible(true);
            }}
            onRead={() => {
              router.push({
                pathname: "/editions/[id]",
                params: { id: edition.id },
              });
            }}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F5F2",
    padding: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    paddingHorizontal: 30,
    paddingBottom: 80,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#C8A25A",
    marginTop: 20,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },

  yearRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },

  year: {
    color: "#A98B5E",
    fontSize: 40,
    fontWeight: "700",
  },

  arrow: {
    color: "#1F1F1F",
    fontSize: 28,
  },

  sectionTitle: {
    color: "#A98B5E",
    marginTop: 40,
    marginBottom: 15,
    fontSize: 14,
    letterSpacing: 2,
  },

  placeholder: {
    color: "#AAA",
  },
});

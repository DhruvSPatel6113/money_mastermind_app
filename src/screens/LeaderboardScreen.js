import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const LEADERBOARD_DATA = [
  { id: '1', rank: 1, name: 'Dhruv (Mastermind)', netWorth: 185000, iq: 185, badge: '👑' },
  { id: '2', rank: 2, name: 'Aarav Sharma', netWorth: 142000, iq: 160, badge: '🥈' },
  { id: '3', rank: 3, name: 'Ananya Verma', netWorth: 128000, iq: 150, badge: '🥉' },
  { id: '4', rank: 4, name: 'Rohan Mehta', netWorth: 98000, iq: 135, badge: '⭐' },
  { id: '5', rank: 5, name: 'Priya Iyer', netWorth: 82000, iq: 120, badge: '⭐' },
];

export default function LeaderboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All-Time Top Investors</Text>
      <Text style={styles.subtitle}>Ranked by cumulative portfolio Net Worth and Financial IQ score.</Text>

      <FlatList
        data={LEADERBOARD_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.rowCard}>
            <Text style={styles.rankBadge}>{item.badge} #{item.rank}</Text>
            <View style={styles.infoCol}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.iq}>IQ Score: {item.iq}</Text>
            </View>
            <Text style={styles.netWorth}>₹{item.netWorth.toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
    padding: 20,
  },
  title: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 20,
  },
  list: {
    gap: 12,
  },
  rowCard: {
    backgroundColor: '#131b2e',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  rankBadge: {
    fontSize: 16,
    fontWeight: '800',
    color: '#38bdf8',
    width: 65,
  },
  infoCol: {
    flex: 1,
  },
  name: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '700',
  },
  iq: {
    color: '#94a3b8',
    fontSize: 12,
  },
  netWorth: {
    color: '#4ade80',
    fontSize: 16,
    fontWeight: '800',
  },
});

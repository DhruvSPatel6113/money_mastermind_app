import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useGameStore } from '../store/gameStore';

const ALL_BADGES = [
  { id: '1', title: 'Credit Ninja', desc: 'Attained a pristine credit score of 800+.', icon: '💳' },
  { id: '2', title: 'Capitalist Rookie', desc: 'Accumulated over ₹50,000 in net portfolio worth.', icon: '📈' },
  { id: '3', title: 'Buffett Protégé', desc: 'Achieved a Financial IQ exceeding 150.', icon: '🧠' },
  { id: '4', title: 'Debt Free Master', desc: 'Maintained 0 revolving credit card liabilities.', icon: '🛡️' },
  { id: '5', title: 'Compounding Titan', desc: 'Completed full lifecycle with diversified asset classes.', icon: '👑' },
];

export default function RewardScreen() {
  const { unlockedBadges } = useGameStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Achievements & Badges</Text>
      <Text style={styles.subtitle}>Unlock badges by making astute financial decisions during the game.</Text>

      <FlatList
        data={ALL_BADGES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isUnlocked = unlockedBadges.includes(item.title);
          return (
            <View style={[styles.badgeCard, isUnlocked ? styles.unlockedCard : styles.lockedCard]}>
              <Text style={styles.icon}>{item.icon}</Text>
              <View style={styles.badgeInfo}>
                <Text style={[styles.badgeTitle, { color: isUnlocked ? '#38bdf8' : '#64748b' }]}>
                  {item.title} {isUnlocked ? '✓' : '🔒'}
                </Text>
                <Text style={styles.badgeDesc}>{item.desc}</Text>
              </View>
            </View>
          );
        }}
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
  badgeCard: {
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  unlockedCard: {
    backgroundColor: '#131b2e',
    borderColor: '#0284c7',
  },
  lockedCard: {
    backgroundColor: '#0b101b',
    borderColor: '#1e293b',
    opacity: 0.6,
  },
  icon: {
    fontSize: 32,
    marginRight: 16,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  badgeDesc: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 18,
  },
});

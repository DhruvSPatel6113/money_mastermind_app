import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useGameStore } from '../store/gameStore';

export default function HomeScreen({ navigation }) {
  const { netWorth, cash, creditScore, financialIQ, loadGame } = useGameStore();

  useEffect(() => {
    loadGame();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerBox}>
        <Text style={styles.eyebrow}>FINANCIAL MASTERY SIMULATOR</Text>
        <Text style={styles.title}>Money Mastermind</Text>
        <Text style={styles.subtitle}>
          Navigate real-world financial dilemmas, master personal budgeting, avoid debt traps, and build generational wealth.
        </Text>
      </View>

      {/* Metrics Dashboard */}
      <View style={styles.metricsCard}>
        <Text style={styles.cardHeader}>CURRENT FINANCIAL VITALS</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>NET WORTH</Text>
            <Text style={[styles.statValue, { color: '#38bdf8' }]}>₹{netWorth.toLocaleString()}</Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>LIQUID CASH</Text>
            <Text style={[styles.statValue, { color: '#4ade80' }]}>₹{cash.toLocaleString()}</Text>
          </View>
        </View>

        <View style={[styles.statsRow, { marginTop: 16 }]}>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>CREDIT SCORE</Text>
            <Text style={[styles.statValue, { color: creditScore >= 750 ? '#4ade80' : '#f59e0b' }]}>
              {creditScore}
            </Text>
          </View>
          <View style={styles.statCol}>
            <Text style={styles.statLabel}>FINANCIAL IQ</Text>
            <Text style={[styles.statValue, { color: '#a855f7' }]}>{financialIQ}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Game')}
      >
        <Text style={styles.primaryButtonText}>🚀 Enter Financial Arena</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Calculator')}
      >
        <Text style={styles.secondaryButtonText}>📊 SIP & Compound Calculator</Text>
      </TouchableOpacity>

      <View style={styles.bottomRow}>
        <TouchableOpacity 
          style={styles.tertiaryButton}
          onPress={() => navigation.navigate('Rewards')}
        >
          <Text style={styles.tertiaryButtonText}>🏆 Badges</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tertiaryButton}
          onPress={() => navigation.navigate('Leaderboard')}
        >
          <Text style={styles.tertiaryButtonText}>📜 High Scores</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090d16',
  },
  content: {
    padding: 20,
  },
  headerBox: {
    marginBottom: 24,
  },
  eyebrow: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  title: {
    color: '#f8fafc',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 22,
  },
  metricsCard: {
    backgroundColor: '#131b2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 24,
  },
  cardHeader: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCol: {
    flex: 1,
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  primaryButton: {
    backgroundColor: '#0284c7',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  secondaryButtonText: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tertiaryButton: {
    flex: 0.48,
    backgroundColor: '#131b2e',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  tertiaryButtonText: {
    color: '#cbd5e1',
    fontSize: 14,
    fontWeight: '600',
  },
});

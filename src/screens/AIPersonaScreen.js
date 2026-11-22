import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGameStore } from '../store/gameStore';

export default function AIPersonaScreen() {
  const { behavioralAI, financialIQ, creditScore, netWorth, history } = useGameStore();
  const persona = behavioralAI.getInvestorPersona();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>NEURAL COGNITIVE PROFILER</Text>
      <Text style={styles.title}>AI Investor DNA</Text>
      <Text style={styles.subtitle}>
        The machine learning behavioral model analyzes every financial trade-off you make to deduce your core investing psychology.
      </Text>

      {/* Archetype Card */}
      <View style={[styles.personaCard, { borderColor: persona.badgeColor }]}>
        <Text style={styles.personaEyebrow}>DETECTED INVESTOR ARCHETYPE</Text>
        <Text style={[styles.personaTitle, { color: persona.badgeColor }]}>{persona.archetype}</Text>
        <Text style={styles.personaDesc}>{persona.description}</Text>

        <View style={styles.divider} />

        <View style={styles.traitBox}>
          <Text style={styles.traitLabel}>🟢 Key Strength:</Text>
          <Text style={styles.traitVal}>{persona.strength}</Text>
        </View>

        <View style={[styles.traitBox, { marginTop: 10 }]}>
          <Text style={styles.traitLabel}>🔴 Key Vulnerability:</Text>
          <Text style={styles.traitVal}>{persona.vulnerability}</Text>
        </View>
      </View>

      {/* Behavioral Sliders */}
      <View style={styles.metricsCard}>
        <Text style={styles.cardHeader}>BEHAVIORAL VECTOR METRICS</Text>

        <View style={styles.meterGroup}>
          <View style={styles.meterLabels}>
            <Text style={styles.meterTitle}>Risk Appetite</Text>
            <Text style={styles.meterVal}>{Math.round(behavioralAI.riskAppetite * 100)}%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${Math.round(behavioralAI.riskAppetite * 100)}%`, backgroundColor: '#38bdf8' }]} />
          </View>
        </View>

        <View style={styles.meterGroup}>
          <View style={styles.meterLabels}>
            <Text style={styles.meterTitle}>Impulsivity Index</Text>
            <Text style={styles.meterVal}>{Math.round(behavioralAI.impulsivity * 100)}%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${Math.round(behavioralAI.impulsivity * 100)}%`, backgroundColor: '#f87171' }]} />
          </View>
        </View>

        <View style={styles.meterGroup}>
          <View style={styles.meterLabels}>
            <Text style={styles.meterTitle}>Debt / Leverage Sensitivity</Text>
            <Text style={styles.meterVal}>{Math.round(behavioralAI.leveragePropensity * 100)}%</Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${Math.round(behavioralAI.leveragePropensity * 100)}%`, backgroundColor: '#a855f7' }]} />
          </View>
        </View>
      </View>

      {/* Decision Memory Timeline */}
      <View style={styles.memoryCard}>
        <Text style={styles.cardHeader}>AI DECISION MEMORY LOG ({history.length} DECISIONS)</Text>
        {history.length === 0 ? (
          <Text style={styles.emptyText}>No decisions recorded yet. Play the Arena to train your AI model!</Text>
        ) : (
          history.slice(-4).map((h, idx) => (
            <View key={idx} style={styles.historyRow}>
              <Text style={styles.hTitle}>{h.title}</Text>
              <Text style={styles.hChoice}>Selected: "{h.chosenLabel}"</Text>
              <Text style={styles.hFeedback}>{h.feedback}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#090d16' },
  content: { padding: 20 },
  eyebrow: { color: '#38bdf8', fontSize: 11, fontWeight: '800', letterSpacing: 1.5, marginBottom: 4 },
  title: { color: '#f8fafc', fontSize: 26, fontWeight: '900', marginBottom: 6 },
  subtitle: { color: '#94a3b8', fontSize: 13, lineHeight: 20, marginBottom: 20 },
  personaCard: {
    backgroundColor: '#131b2e',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1.5,
    marginBottom: 20,
  },
  personaEyebrow: { color: '#64748b', fontSize: 10, fontWeight: '800', letterSpacing: 1, marginBottom: 6 },
  personaTitle: { fontSize: 22, fontWeight: '900', marginBottom: 8 },
  personaDesc: { color: '#cbd5e1', fontSize: 14, lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#1e293b', marginVertical: 14 },
  traitBox: { gap: 2 },
  traitLabel: { color: '#94a3b8', fontSize: 12, fontWeight: '700' },
  traitVal: { color: '#f1f5f9', fontSize: 13, lineHeight: 18 },
  metricsCard: {
    backgroundColor: '#131b2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 20,
    gap: 16,
  },
  cardHeader: { color: '#64748b', fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  meterGroup: { gap: 6 },
  meterLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  meterTitle: { color: '#e2e8f0', fontSize: 13, fontWeight: '600' },
  meterVal: { color: '#38bdf8', fontSize: 13, fontWeight: '700' },
  track: { height: 8, backgroundColor: '#090d16', borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
  memoryCard: {
    backgroundColor: '#131b2e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 20,
  },
  emptyText: { color: '#64748b', fontSize: 13, marginTop: 10, fontStyle: 'italic' },
  historyRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
    gap: 4,
  },
  hTitle: { color: '#38bdf8', fontSize: 13, fontWeight: '700' },
  hChoice: { color: '#f8fafc', fontSize: 12, fontWeight: '600' },
  hFeedback: { color: '#94a3b8', fontSize: 11, lineHeight: 16 },
});

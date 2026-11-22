import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useGameStore } from '../store/gameStore';
import { SCENARIOS } from '../data/scenarios';

export default function GameScreen({ navigation }) {
  const { currentScenarioIndex, isGameOver, applyChoice, resetGame, cash, netWorth, creditScore, financialIQ } = useGameStore();
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  if (isGameOver || currentScenarioIndex >= SCENARIOS.length) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.gameOverEmoji}>🎉</Text>
          <Text style={styles.gameOverTitle}>SIMULATION COMPLETE!</Text>
          <Text style={styles.gameOverSubtitle}>
            You completed all financial lifecycles. Here is your final portfolio snapshot:
          </Text>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryLine}>💰 Final Net Worth: ₹{netWorth.toLocaleString()}</Text>
            <Text style={styles.summaryLine}>💳 Final Credit Score: {creditScore}</Text>
            <Text style={styles.summaryLine}>🧠 Financial IQ: {financialIQ} / 200</Text>
          </View>

          <TouchableOpacity style={styles.actionBtn} onPress={() => resetGame()}>
            <Text style={styles.actionBtnText}>🔄 Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionBtn, { backgroundColor: '#1e293b', marginTop: 12 }]} 
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.actionBtnText}>🏠 Return to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentScenario = SCENARIOS[currentScenarioIndex];

  const handleSelectChoice = (choice) => {
    setSelectedFeedback(choice.feedback);
    setTimeout(() => {
      applyChoice(choice);
      setSelectedFeedback(null);
    }, 1800);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Stage Badge & Progress */}
      <View style={styles.topBar}>
        <Text style={styles.stageBadge}>{currentScenario.stage}</Text>
        <Text style={styles.progressText}>
          Scenario {currentScenarioIndex + 1} of {SCENARIOS.length}
        </Text>
      </View>

      {/* Scenario Card */}
      <View style={styles.scenarioCard}>
        <Text style={styles.scenarioTitle}>{currentScenario.title}</Text>
        <Text style={styles.scenarioContext}>{currentScenario.context}</Text>
      </View>

      {/* Immediate Decision Feedback Banner */}
      {selectedFeedback && (
        <View style={styles.feedbackBanner}>
          <Text style={styles.feedbackTitle}>💡 FINANCIAL IMPACT ANALYSIS</Text>
          <Text style={styles.feedbackText}>{selectedFeedback}</Text>
        </View>
      )}

      {/* Choices */}
      <Text style={styles.decisionPrompt}>WHAT DECISION DO YOU MAKE?</Text>
      {currentScenario.choices.map((choice) => (
        <TouchableOpacity
          key={choice.id}
          style={styles.choiceCard}
          disabled={!!selectedFeedback}
          onPress={() => handleSelectChoice(choice)}
        >
          <View style={styles.choiceHeader}>
            <View style={styles.choiceTag}>
              <Text style={styles.choiceTagText}>{choice.id}</Text>
            </View>
            <Text style={styles.choiceLabel}>{choice.label}</Text>
          </View>

          <View style={styles.deltasRow}>
            {choice.netWorthDelta !== 0 && (
              <Text style={[styles.deltaPill, { color: choice.netWorthDelta > 0 ? '#4ade80' : '#f87171' }]}>
                NW: {choice.netWorthDelta > 0 ? '+' : ''}₹{choice.netWorthDelta.toLocaleString()}
              </Text>
            )}
            {choice.creditDelta !== 0 && (
              <Text style={[styles.deltaPill, { color: choice.creditDelta > 0 ? '#4ade80' : '#f87171' }]}>
                Credit: {choice.creditDelta > 0 ? '+' : ''}{choice.creditDelta}
              </Text>
            )}
            {choice.iqDelta !== 0 && (
              <Text style={[styles.deltaPill, { color: choice.iqDelta > 0 ? '#a855f7' : '#f87171' }]}>
                IQ: {choice.iqDelta > 0 ? '+' : ''}{choice.iqDelta}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stageBadge: {
    backgroundColor: '#0369a1',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  progressText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  scenarioCard: {
    backgroundColor: '#131b2e',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 20,
  },
  scenarioTitle: {
    color: '#f8fafc',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
  },
  scenarioContext: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 24,
  },
  feedbackBanner: {
    backgroundColor: '#1e1b4b',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4338ca',
    marginBottom: 20,
  },
  feedbackTitle: {
    color: '#818cf8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },
  feedbackText: {
    color: '#e0e7ff',
    fontSize: 13,
    lineHeight: 20,
  },
  decisionPrompt: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 14,
  },
  choiceCard: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 14,
  },
  choiceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  choiceTag: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0284c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  choiceTagText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 13,
  },
  choiceLabel: {
    flex: 1,
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  deltasRow: {
    flexDirection: 'row',
    gap: 12,
  },
  deltaPill: {
    fontSize: 12,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#131b2e',
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: '#1e293b',
    alignItems: 'center',
    margin: 20,
  },
  gameOverEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  gameOverTitle: {
    color: '#38bdf8',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 8,
  },
  gameOverSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryBox: {
    backgroundColor: '#090d16',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 24,
    gap: 8,
  },
  summaryLine: {
    color: '#e2e8f0',
    fontSize: 15,
    fontWeight: '600',
  },
  actionBtn: {
    backgroundColor: '#0284c7',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

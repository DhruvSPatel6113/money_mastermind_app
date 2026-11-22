import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function InvestmentCalculatorScreen() {
  const [monthlySIP, setMonthlySIP] = useState('5000');
  const [returnRate, setReturnRate] = useState('12');
  const [years, setYears] = useState('10');

  const p = parseFloat(monthlySIP) || 0;
  const i = (parseFloat(returnRate) || 0) / 100 / 12;
  const n = (parseFloat(years) || 0) * 12;

  // Formula: M = P * [ (1 + i)^n - 1 ] / i * (1 + i)
  const totalInvested = p * n;
  let maturityValue = 0;
  if (i > 0 && n > 0) {
    maturityValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  }
  const estimatedReturns = Math.max(0, maturityValue - totalInvested);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Systematic Investment Plan (SIP)</Text>
      <Text style={styles.subtitle}>
        Calculate how discipline and compounding returns build massive wealth over time.
      </Text>

      {/* Input Fields */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>MONTHLY INVESTMENT (₹)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={monthlySIP}
          onChangeText={setMonthlySIP}
          placeholderTextColor="#64748b"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>EXPECTED ANNUAL RETURN RATE (% p.a.)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={returnRate}
          onChangeText={setReturnRate}
          placeholderTextColor="#64748b"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>TIME HORIZON (YEARS)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={years}
          onChangeText={setYears}
          placeholderTextColor="#64748b"
        />
      </View>

      {/* Results Display */}
      <View style={styles.resultCard}>
        <Text style={styles.resultEyebrow}>PROJECTION AT MATURITY</Text>
        <Text style={styles.totalValue}>₹{Math.round(maturityValue).toLocaleString()}</Text>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Total Amount Invested:</Text>
          <Text style={styles.rowVal}>₹{Math.round(totalInvested).toLocaleString()}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Estimated Wealth Gain:</Text>
          <Text style={[styles.rowVal, { color: '#4ade80' }]}>
            +₹{Math.round(estimatedReturns).toLocaleString()}
          </Text>
        </View>
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
  title: {
    color: '#f8fafc',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#131b2e',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1e293b',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultCard: {
    backgroundColor: '#131b2e',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: '#0284c7',
    marginTop: 12,
  },
  resultEyebrow: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  totalValue: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#1e293b',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  rowLabel: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  rowVal: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '700',
  },
});

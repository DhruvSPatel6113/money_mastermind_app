import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCENARIOS } from '../data/scenarios';
import { FinancialBehavioralAI } from '../ai/BehavioralAI';

const STORAGE_KEY = '@money_mastermind_save_v2';

export const useGameStore = create((set, get) => ({
  playerName: 'Dhruv',
  level: 1,
  currentScenarioIndex: 0,
  cash: 10000,
  netWorth: 10000,
  creditScore: 720,
  financialIQ: 100,
  isGameOver: false,
  gameSummary: null,
  history: [],
  unlockedBadges: [],
  behavioralAI: new FinancialBehavioralAI(),

  setPlayerName: (name) => set({ playerName: name }),

  resetGame: () => {
    const freshAI = new FinancialBehavioralAI();
    set({
      level: 1,
      currentScenarioIndex: 0,
      cash: 10000,
      netWorth: 10000,
      creditScore: 720,
      financialIQ: 100,
      isGameOver: false,
      gameSummary: null,
      history: [],
      behavioralAI: freshAI,
    });
    get().saveGame();
  },

  applyChoice: (choice) => {
    const { cash, netWorth, creditScore, financialIQ, currentScenarioIndex, history, unlockedBadges, behavioralAI } = get();

    // 1. Train the Behavioral AI model on this choice
    const currentScenario = SCENARIOS[currentScenarioIndex] || {};
    behavioralAI.recordDecision(choice, currentScenario.stage || 'General');

    // 2. Adjust player metrics
    const newCash = Math.max(0, cash + choice.cashDelta);
    const newNetWorth = Math.max(0, netWorth + choice.netWorthDelta);
    const newCreditScore = Math.min(900, Math.max(300, creditScore + choice.creditDelta));
    const newIQ = Math.min(200, Math.max(0, financialIQ + choice.iqDelta));

    const nextIndex = currentScenarioIndex + 1;
    const isFinished = nextIndex >= SCENARIOS.length;

    // 3. Unlock Badges dynamically
    const newBadges = [...unlockedBadges];
    if (newCreditScore >= 800 && !newBadges.includes('Credit Ninja')) newBadges.push('Credit Ninja');
    if (newNetWorth >= 50000 && !newBadges.includes('Capitalist Rookie')) newBadges.push('Capitalist Rookie');
    if (newIQ >= 150 && !newBadges.includes('Buffett Protégé')) newBadges.push('Buffett Protégé');
    if (behavioralAI.impulsivity < 0.25 && !newBadges.includes('Disciplined Zen Monk')) newBadges.push('Disciplined Zen Monk');

    set({
      cash: newCash,
      netWorth: newNetWorth,
      creditScore: newCreditScore,
      financialIQ: newIQ,
      currentScenarioIndex: nextIndex,
      isGameOver: isFinished,
      unlockedBadges: newBadges,
      history: [
        ...history,
        {
          scenarioId: currentScenario.id,
          title: currentScenario.title,
          chosenLabel: choice.label,
          feedback: choice.feedback,
          timestamp: new Date().toLocaleTimeString(),
        },
      ],
    });

    get().saveGame();
  },

  saveGame: async () => {
    try {
      const state = get();
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          playerName: state.playerName,
          level: state.level,
          currentScenarioIndex: state.currentScenarioIndex,
          cash: state.cash,
          netWorth: state.netWorth,
          creditScore: state.creditScore,
          financialIQ: state.financialIQ,
          unlockedBadges: state.unlockedBadges,
          history: state.history,
          aiState: {
            riskAppetite: state.behavioralAI.riskAppetite,
            impulsivity: state.behavioralAI.impulsivity,
            leveragePropensity: state.behavioralAI.leveragePropensity,
          },
        })
      );
    } catch (e) {
      console.warn('Failed to save game state', e);
    }
  },

  loadGame: async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        const restoredAI = new FinancialBehavioralAI(saved.aiState || {});
        set({
          ...saved,
          behavioralAI: restoredAI,
        });
      }
    } catch (e) {
      console.warn('Failed to load game state', e);
    }
  },
}));

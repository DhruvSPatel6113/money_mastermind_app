import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCENARIOS } from '../data/scenarios';

const STORAGE_KEY = '@money_mastermind_save_v1';

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

  setPlayerName: (name) => set({ playerName: name }),

  resetGame: () => {
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
    });
    get().saveGame();
  },

  applyChoice: (choice) => {
    const { cash, netWorth, creditScore, financialIQ, currentScenarioIndex, history, unlockedBadges } = get();

    const newCash = Math.max(0, cash + choice.cashDelta);
    const newNetWorth = Math.max(0, netWorth + choice.netWorthDelta);
    const newCreditScore = Math.min(900, Math.max(300, creditScore + choice.creditDelta));
    const newIQ = Math.min(200, Math.max(0, financialIQ + choice.iqDelta));

    const nextIndex = currentScenarioIndex + 1;
    const isFinished = nextIndex >= SCENARIOS.length;

    // Check Badge triggers
    const newBadges = [...unlockedBadges];
    if (newCreditScore >= 800 && !newBadges.includes('Credit Ninja')) {
      newBadges.push('Credit Ninja');
    }
    if (newNetWorth >= 50000 && !newBadges.includes('Capitalist Rookie')) {
      newBadges.push('Capitalist Rookie');
    }
    if (newIQ >= 150 && !newBadges.includes('Buffett Protégé')) {
      newBadges.push('Buffett Protégé');
    }

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
          scenarioId: SCENARIOS[currentScenarioIndex].id,
          title: SCENARIOS[currentScenarioIndex].title,
          chosenLabel: choice.label,
          feedback: choice.feedback,
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
        set(saved);
      }
    } catch (e) {
      console.warn('Failed to load game state', e);
    }
  },
}));

# Money Mastermind (React Native)

> An interactive native React Native financial decision simulation game featuring budgeting, investment allocations, debt mitigation, and credit score dynamics.

[![React Native](https://img.shields.io/badge/React%20Native-0.76+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Zustand](https://img.shields.io/badge/State-Zustand-443e38?style=for-the-badge)](https://github.com/pmndrs/zustand)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-38bdf8?style=for-the-badge&logo=android&logoColor=white)](https://reactnative.dev/)

---

## 🌟 Executive Overview
**Money Mastermind** is an interactive financial decision engine designed to teach personal finance, risk management, and wealth creation principles through a simulated player lifecycle.

Unlike standard static quiz apps, the engine evaluates real-time **trade-offs across four interconnected economic vectors**:
1. **Liquid Cash** (Monthly liquidity)
2. **Net Worth** (Compounding portfolio assets)
3. **Credit Score** (CIBIL / FICO 300–900 debt utilization simulation)
4. **Financial IQ** (Behavioral bias score)

---

## 📱 Core Architecture & Features

### 1. Dynamic Financial Decision Engine
- **Progression Lifecycles**: Progresses across three distinct stages:
  - **Stage 1: College Days**: Handling freelance cashflows, debit cards, emergency deposits vs. impulse purchases.
  - **Stage 2: Young Professional**: Tax optimization (ELSS, PPF), term insurance, credit card APR traps, and market dip buying.
  - **Stage 3: Wealth Builder**: Asset allocation (Real Estate Investment Trusts, Sovereign Gold Bonds, Index Funds vs. speculative venture bets).
- **Instant Decision Feedback**: Immediate analytical breakdown explaining why each financial decision accelerates or hinders compounding.

### 2. Systematic Investment Plan (SIP) & Compound Interest Calculator
- Native compound interest mathematical formula modeling:
  $$M = P \times \frac{(1 + i)^n - 1}{i} \times (1 + i)$$
- Computes maturity projections, cumulative capital invested, and estimated returns across dynamic time horizons.

### 3. Local Offline Persistence & Badges
- Powered by **Zustand** state store decoupled from the UI layer.
- Serializes game states and unlocked achievements (`Credit Ninja`, `Buffett Protégé`, `Capitalist Rookie`) locally via `@react-native-async-storage/async-storage`.

---

## 🛠️ Technical Stack
- **Framework**: Standalone Native React Native
- **Navigation**: `@react-navigation/native` & `@react-navigation/stack`
- **State Management**: `zustand`
- **Offline Storage**: `@react-native-async-storage/async-storage`
- **Safe Area**: `react-native-safe-area-context` & `react-native-screens`

---

## 🚀 Getting Started (Run Locally)

### Prerequisites
- Node.js 18+
- Android Studio / Xcode command-line tools

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/DhruvSPatel6113/money_mastermind_app.git
   cd money_mastermind_app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run on Android:
   ```bash
   npx react-native run-android
   ```
4. Run on iOS:
   ```bash
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

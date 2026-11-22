/**
 * Adaptive Financial Behavioral Profiler & Dynamic Difficulty Adjuster (DDA)
 * 
 * Implements:
 * 1. Multi-factor behavioral scoring:
 *    - Risk Appetite [0.0 - 1.0] (Conservatism vs Aggressive Speculation)
 *    - Impulsivity vs Long-Term Discipline [0.0 - 1.0]
 *    - Debt Sensitivity / Leverage Propensity [0.0 - 1.0]
 * 2. Real-time Bayesian / Exponential Smoothing Update on every decision
 * 3. Dynamic Scenario Generation & Difficulty Calibration
 * 4. AI Financial Mentor persona providing cognitive behavioral reflections
 */

export class FinancialBehavioralAI {
  constructor(initialState = {}) {
    this.riskAppetite = initialState.riskAppetite ?? 0.5;
    this.impulsivity = initialState.impulsivity ?? 0.5;
    this.leveragePropensity = initialState.leveragePropensity ?? 0.5;
    this.decisionHistory = initialState.decisionHistory ?? [];
    this.alpha = 0.25; // Smoothing factor for real-time policy updates
  }

  /**
   * Evaluates the player's choice and dynamically updates the behavioral vector
   */
  recordDecision(choice, scenarioCategory) {
    // 1. Calculate choice attributes
    const riskFactor = choice.cashDelta < 0 && choice.netWorthDelta > 20000 ? 0.8 : choice.cashDelta > 0 ? 0.3 : 0.5;
    const impulseFactor = choice.iqDelta < 0 ? 0.9 : 0.1;
    const debtFactor = choice.creditDelta < 0 ? 0.85 : choice.creditDelta > 20 ? 0.15 : 0.4;

    // 2. Exponential Moving Average update
    this.riskAppetite = this.alpha * riskFactor + (1 - this.alpha) * this.riskAppetite;
    this.impulsivity = this.alpha * impulseFactor + (1 - this.alpha) * this.impulsivity;
    this.leveragePropensity = this.alpha * debtFactor + (1 - this.alpha) * this.leveragePropensity;

    this.decisionHistory.push({
      timestamp: Date.now(),
      category: scenarioCategory,
      choiceLabel: choice.label,
      iqDelta: choice.iqDelta,
      riskSnapshot: this.riskAppetite,
      impulseSnapshot: this.impulsivity,
    });
  }

  /**
   * Classifies user into an investor persona based on continuous vector clustering
   */
  getInvestorPersona() {
    if (this.impulsivity > 0.65) {
      return {
        archetype: 'The Impulse Speculator',
        description: 'You tend to prioritize high dopamine short-term rewards over systematic compounding.',
        strength: 'Quick to seize immediate market liquidity.',
        vulnerability: 'Vulnerable to FOMO, high credit utilization, and bubble chasing.',
        badgeColor: '#f87171',
      };
    } else if (this.riskAppetite < 0.35 && this.leveragePropensity < 0.3) {
      return {
        archetype: 'The Capital Fortress',
        description: 'Deeply risk-averse, favoring fixed deposits, sovereign guarantees, and cash buffers.',
        strength: 'Unshakeable defense during market crashes.',
        vulnerability: 'Risk of inflation drag eroding long-term real purchasing power.',
        badgeColor: '#38bdf8',
      };
    } else if (this.riskAppetite >= 0.5 && this.impulsivity <= 0.35) {
      return {
        archetype: 'The Quantitative Compounder',
        description: 'Disciplined, disciplined asset allocator leveraging low-cost index funds and opportunistic dip buys.',
        strength: 'Mastery over emotional volatility and systematic dollar-cost averaging.',
        vulnerability: 'May hesitate on asymmetric early-stage opportunities.',
        badgeColor: '#4ade80',
      };
    } else {
      return {
        archetype: 'The Adaptive Balancer',
        description: 'Balanced hybrid adjusting posture based on market conditions.',
        strength: 'Flexibility across multiple asset classes.',
        vulnerability: 'Requires continuous tracking to avoid portfolio drift.',
        badgeColor: '#a855f7',
      };
    }
  }

  /**
   * Dynamically filters and calibrates the next scenario to stress-test the user's specific weakness
   */
  getNextDynamicChallenge(allScenarios, currentIndex) {
    // If player is highly impulsive -> generate a seductive predatory debt / luxury bait scenario
    // If player is overly defensive -> generate an inflation penalty crisis scenario
    const persona = this.getInvestorPersona();

    if (this.impulsivity > 0.6) {
      return {
        id: `AI-STRESS-${Date.now()}`,
        stage: 'AI Dynamic Stress Test: Impulse Trap',
        title: 'Exclusive High-Yield Crypto Meme Fund',
        context: `[AI ADAPTATION TRIGGERED: Detected impulsive trading pattern (${Math.round(this.impulsivity * 100)}% bias)]\nA high-profile influencer guarantees 400% APY returns in 30 days if you lock ₹25,000 immediately.`,
        choices: [
          {
            id: 'A',
            label: 'FOMO in: Wire ₹25,000 to the anonymous telegram contract',
            feedback: 'AI Stress Trap: Classic Ponzi rug-pull! Total capital wipeout.',
            cashDelta: -25000,
            netWorthDelta: -25000,
            creditDelta: 0,
            iqDelta: -40,
          },
          {
            id: 'B',
            label: 'Perform due diligence, check regulatory disclosures, and walk away',
            feedback: 'AI Breakthrough! You resisted the dopamine impulse trap and protected your principal.',
            cashDelta: 0,
            netWorthDelta: +5000,
            creditDelta: +10,
            iqDelta: +45,
          },
        ],
      };
    }

    if (this.riskAppetite < 0.35) {
      return {
        id: `AI-STRESS-${Date.now()}`,
        stage: 'AI Dynamic Stress Test: Inflation Squeeze',
        title: 'Macroeconomic Stagflation Wave',
        context: `[AI ADAPTATION TRIGGERED: Detected excessive cash hoarding (${Math.round(this.riskAppetite * 100)}% risk index)]\nInflation spikes to 8.5% while your cash rests in savings accounts yielding 3%.`,
        choices: [
          {
            id: 'A',
            label: 'Keep 100% in pure cash under the mattress',
            feedback: 'Negative real return: Inflation invisibly erodes 5.5% of your purchasing power annually.',
            cashDelta: -3000,
            netWorthDelta: -8000,
            creditDelta: 0,
            iqDelta: -25,
          },
          {
            id: 'B',
            label: 'Deploy capital into Inflation-Protected Securities & Dividend Aristocrats',
            feedback: 'Tactical inflation hedge: You preserve capital purchasing power.',
            cashDelta: -5000,
            netWorthDelta: +12000,
            creditDelta: +15,
            iqDelta: +35,
          },
        ],
      };
    }

    return null; // Fallback to standard scenario sequence
  }
}

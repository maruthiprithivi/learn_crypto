import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Main app store with persistence
export const useAppStore = create(
  persist(
    (set, get) => ({
      // User progress tracking
      hasAcceptedDisclaimer: false,
      acceptDisclaimer: () => set({ hasAcceptedDisclaimer: true }),

      // Track progress for each learning path
      bitcoinProgress: {
        currentStage: 0,
        completedStages: [],
        achievements: [],
      },
      ethereumProgress: {
        currentStage: 0,
        completedStages: [],
        achievements: [],
      },
      solanaProgress: {
        currentStage: 0,
        completedStages: [],
        achievements: [],
      },
      tradingProgress: {
        currentStage: 0,
        completedStages: [],
        achievements: [],
      },

      // Update progress for a specific track
      updateProgress: (track, stageNumber) => {
        const progressKey = `${track}Progress`
        const currentProgress = get()[progressKey]

        set({
          [progressKey]: {
            ...currentProgress,
            currentStage: Math.max(currentProgress.currentStage, stageNumber + 1),
            completedStages: [...new Set([...currentProgress.completedStages, stageNumber])],
          },
        })
      },

      // Add achievement
      addAchievement: (track, achievement) => {
        const progressKey = `${track}Progress`
        const currentProgress = get()[progressKey]

        set({
          [progressKey]: {
            ...currentProgress,
            achievements: [...currentProgress.achievements, achievement],
          },
        })
      },

      // User wallet data (for simulations)
      simulatedWallets: {
        bitcoin: null,
        ethereum: null,
        solana: null,
      },

      setSimulatedWallet: (chain, walletData) => {
        set({
          simulatedWallets: {
            ...get().simulatedWallets,
            [chain]: walletData,
          },
        })
      },

      // Reset all progress (for testing)
      resetProgress: () => {
        set({
          hasAcceptedDisclaimer: false,
          bitcoinProgress: { currentStage: 0, completedStages: [], achievements: [] },
          ethereumProgress: { currentStage: 0, completedStages: [], achievements: [] },
          solanaProgress: { currentStage: 0, completedStages: [], achievements: [] },
          tradingProgress: { currentStage: 0, completedStages: [], achievements: [] },
          simulatedWallets: { bitcoin: null, ethereum: null, solana: null },
        })
      },
    }),
    {
      name: 'cryptolearn-storage',
    }
  )
)

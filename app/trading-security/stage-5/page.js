'use client'

import { useState } from 'react'
import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'
import { Badge } from '@/components/ui/badge'

export default function Stage5() {
  const trackMap = { 'solana': 'Solana', 'trading-security': 'Trading & Security' }
  const colorMap = { 'solana': 'solana', 'trading-security': 'security' }
  const track = 'trading-security'
  const maxStage = track === 'solana' ? 10 : 12
  const nextStage = 5 < maxStage ? 5 + 1 : null

  const [selectedEmotion, setSelectedEmotion] = useState('fear')

  const emotions = {
    fear: {
      name: 'Fear',
      icon: '😰',
      triggers: ['Market crash', 'Losing trade', 'Missing out', 'Uncertainty'],
      symptoms: ['Hesitation to enter', 'Selling too early', 'Avoiding trades', 'Analysis paralysis'],
      solution: 'Stick to your plan, use stop-losses, trade smaller sizes',
      color: 'red'
    },
    greed: {
      name: 'Greed',
      icon: '🤑',
      triggers: ['Winning streak', 'Big gains', 'FOMO', 'Bull market'],
      symptoms: ['Over-trading', 'Moving stop-loss', 'Ignoring risk', 'Revenge trading'],
      solution: 'Set profit targets, take partial profits, respect your rules',
      color: 'green'
    },
    fomo: {
      name: 'FOMO',
      icon: '😱',
      triggers: ['Pump notifications', 'Social media hype', 'Friends profits', 'News'],
      symptoms: ['Chasing pumps', 'No plan entry', 'Buying highs', 'Impulsive trades'],
      solution: 'Wait for pullbacks, stick to strategy, disable notifications',
      color: 'orange'
    },
    revenge: {
      name: 'Revenge',
      icon: '😡',
      triggers: ['Stop-loss hit', 'Losing streak', 'Frustration', 'Ego damage'],
      symptoms: ['Over-leveraging', 'Ignoring signals', 'Bigger positions', 'Desperate trading'],
      solution: 'Step away, journal the loss, take a break, stick to size',
      color: 'purple'
    },
    euphoria: {
      name: 'Euphoria',
      icon: '🤩',
      triggers: ['Big win', 'Consecutive wins', 'Bull run', 'Overconfidence'],
      symptoms: ['Ignoring risk', 'Increasing size', 'Breaking rules', 'Feeling invincible'],
      solution: 'Review your plan, maintain discipline, reduce position size',
      color: 'yellow'
    },
    regret: {
      name: 'Regret',
      icon: '😔',
      triggers: ['Missed trade', 'Sold too early', 'Wrong decision', 'Comparison'],
      symptoms: ['Second-guessing', 'Overthinking', 'Hesitation', 'Dwelling on past'],
      solution: 'Learn and move on, focus on process not outcomes, journal',
      color: 'blue'
    }
  }

  const currentEmotion = emotions[selectedEmotion]

  return (
    <StageLayout
      trackName={trackMap[track] + " Track"}
      trackHref={"/" + track}
      trackColor={colorMap[track]}
      stageNumber={5}
      stageTitle="Trading Psychology & Emotions"
      stageDescription="Master your mind - the difference between winning and losing traders"
      nextStageHref={nextStage ? `/${track}/stage-${nextStage}` : null}
      estimatedTime="20 min"
    >
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">🧠 Trading Psychology & Emotions</h2>
        <p className="text-gray-300 mb-4">
          The biggest challenge in trading isn't learning indicators or strategies - it's controlling your emotions.
          90% of trading success is psychological. Master your mind, master the markets.
        </p>
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
          <h3 className="font-bold text-purple-400 mb-2">💭 The Hard Truth</h3>
          <p className="text-white text-lg font-semibold mb-2">
            "The market is designed to trigger every emotional weakness you have."
          </p>
          <p className="text-sm text-gray-300">
            Your emotions are your biggest enemy in trading. Learn to recognize and control them, or they will control your wallet.
          </p>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">😰 The 6 Emotional Enemies</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          {Object.entries(emotions).map(([key, emotion]) => (
            <button
              key={key}
              onClick={() => setSelectedEmotion(key)}
              className={`p-3 rounded-lg border text-center transition-all ${
                selectedEmotion === key
                  ? `bg-${emotion.color}-500/20 border-${emotion.color}-500/50`
                  : 'bg-white/5 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="text-3xl mb-1">{emotion.icon}</div>
              <div className="text-xs text-white font-semibold">{emotion.name}</div>
            </button>
          ))}
        </div>

        <div className={`bg-gradient-to-br from-${currentEmotion.color}-500/10 to-${currentEmotion.color}-600/10 border border-${currentEmotion.color}-500/30 rounded-lg p-6`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-5xl">{currentEmotion.icon}</span>
            <h4 className="text-2xl font-bold text-white">{currentEmotion.name}</h4>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-black/20 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-2">🔥 Common Triggers:</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                {currentEmotion.triggers.map((trigger, idx) => (
                  <li key={idx}>• {trigger}</li>
                ))}
              </ul>
            </div>

            <div className="bg-black/20 rounded-lg p-4">
              <h5 className="font-semibold text-white mb-2">⚠️ Warning Signs:</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                {currentEmotion.symptoms.map((symptom, idx) => (
                  <li key={idx}>• {symptom}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <h5 className="font-semibold text-green-400 mb-2">✅ Solution:</h5>
            <p className="text-white">{currentEmotion.solution}</p>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🛡️ Psychological Defense Strategies</h3>
        <div className="space-y-4">
          {[
            {
              title: 'Pre-Trade Checklist',
              description: 'Create a checklist to follow before every trade',
              items: ['Is this in my plan?', 'Risk calculated?', 'Stop-loss set?', 'Am I emotional?'],
              benefit: 'Prevents impulsive decisions',
              color: 'blue'
            },
            {
              title: 'Trading Journal',
              description: 'Record every trade with emotions and lessons',
              items: ['Entry/exit prices', 'Why you entered', 'How you felt', 'What you learned'],
              benefit: 'Identify patterns in mistakes',
              color: 'purple'
            },
            {
              title: 'Position Sizing Rules',
              description: 'Never increase size when emotional',
              items: ['Stick to 1-2% risk', 'No revenge sizing', 'Smaller when uncertain', 'Scale down on tilt'],
              benefit: 'Protects capital during emotional trading',
              color: 'green'
            },
            {
              title: 'Break Protocols',
              description: 'Mandatory breaks to reset psychology',
              items: ['After 3 losing trades', 'After big win', 'When feeling tilted', 'Daily trading limit'],
              benefit: 'Prevents emotional spirals',
              color: 'orange'
            }
          ].map((strategy, idx) => (
            <div key={idx} className={`bg-gradient-to-r from-${strategy.color}-500/10 to-${strategy.color}-600/10 border border-${strategy.color}-500/30 rounded-lg p-4`}>
              <h4 className="font-bold text-white mb-2">{strategy.title}</h4>
              <p className="text-sm text-gray-300 mb-3">{strategy.description}</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-black/20 rounded p-3">
                  <div className="text-xs text-gray-400 mb-1">Implementation:</div>
                  <ul className="space-y-1 text-xs text-gray-300">
                    {strategy.items.map((item, iidx) => (
                      <li key={iidx}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-black/20 rounded p-3 flex items-center">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Benefit:</div>
                    <div className="text-sm text-green-400 font-semibold">{strategy.benefit}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">📊 The Trader's Mindset</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-6">
            <h4 className="text-lg font-bold text-red-400 mb-4">❌ Losing Trader Mindset</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>"I NEED to make money today"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>"This trade will make me rich"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>"I'm smarter than the market"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>"Losses are personal failures"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>"Rules don't apply to me"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-0.5">✗</span>
                <span>"I'll recover this loss now"</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-6">
            <h4 className="text-lg font-bold text-green-400 mb-4">✅ Winning Trader Mindset</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>"I follow my plan, period"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>"Long-term consistency wins"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>"The market doesn't care about me"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>"Losses are part of the game"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>"Rules protect my capital"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">✓</span>
                <span>"There's always another trade"</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">🎯 The 10 Commandments of Trading Psychology</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { num: 1, text: 'Process over profits - focus on following your plan perfectly' },
            { num: 2, text: 'Accept losses gracefully - they are the cost of doing business' },
            { num: 3, text: 'Never revenge trade - step away when emotional' },
            { num: 4, text: 'Stick to your risk limits - no matter what' },
            { num: 5, text: 'Trade your plan, plan your trade - no exceptions' },
            { num: 6, text: 'Stay humble - the market can humble anyone' },
            { num: 7, text: 'Be patient - wait for your setup' },
            { num: 8, text: 'Learn from every trade - journal everything' },
            { num: 9, text: 'Protect your capital first - making money second' },
            { num: 10, text: 'Take breaks - rest is part of the strategy' }
          ].map((commandment) => (
            <div key={commandment.num} className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-lg px-3 py-1">
                  {commandment.num}
                </Badge>
                <p className="text-sm text-gray-300 mt-1">{commandment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">💊 Daily Mental Habits</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              time: 'Before Trading',
              habits: ['Review trading plan', 'Check mental state', 'Set daily goals', 'Meditation 5 min'],
              icon: '🌅',
              color: 'blue'
            },
            {
              time: 'During Trading',
              habits: ['Follow checklist', 'Journal each trade', 'Take breaks', 'Stay hydrated'],
              icon: '⚡',
              color: 'purple'
            },
            {
              time: 'After Trading',
              habits: ['Review all trades', 'Note emotions', 'Update journal', 'Plan tomorrow'],
              icon: '🌙',
              color: 'green'
            }
          ].map((period, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${period.color}-500/10 to-${period.color}-600/10 border border-${period.color}-500/30 rounded-lg p-4`}>
              <div className="text-3xl mb-2">{period.icon}</div>
              <h4 className="font-bold text-white mb-3">{period.time}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {period.habits.map((habit, hidx) => (
                  <li key={hidx} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">✓</span>
                    <span>{habit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Emotions are your biggest enemy:</strong> Fear, greed, FOMO will destroy your account</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Have a pre-trade checklist:</strong> Prevents emotional, impulsive trades</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Journal every trade:</strong> Track emotions to identify patterns in mistakes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Take mandatory breaks:</strong> After 3 losses, big win, or when emotional</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Process over profits:</strong> Focus on following your plan, not making money</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-400 mt-1">✓</span>
            <span><strong>Never revenge trade:</strong> Step away when you want to "win back" losses</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-400 mt-1">!</span>
            <span><strong>90% of trading is psychology:</strong> Master your mind or the market will master your wallet</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}

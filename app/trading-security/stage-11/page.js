'use client'

import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'

export default function Stage11() {
  const trackMap = { 'solana': 'Solana', 'trading-security': 'Trading & Security' }
  const colorMap = { 'solana': 'solana', 'trading-security': 'security' }
  const track = 'trading-security'
  const maxStage = track === 'solana' ? 10 : 12
  const nextStage = 11 < maxStage ? 11 + 1 : null
  
  return (
    <StageLayout
      trackName={trackMap[track] + " Track"}
      trackHref={"/" + track}
      trackColor={colorMap[track]}
      stageNumber={11}
      stageTitle="Stage 11"
      stageDescription="Interactive learning content"
      nextStageHref={nextStage ? `/${track}/stage-${nextStage}` : null}
      estimatedTime="15 min"
    >
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Stage 11</h2>
        <p className="text-gray-300">
          Interactive content for this stage will be added. The structure is ready!
        </p>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <p className="text-gray-300">Content coming soon for stage 11</p>
      </Card>
    </StageLayout>
  )
}

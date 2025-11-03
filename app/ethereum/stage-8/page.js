'use client'

import StageLayout from '@/components/common/StageLayout'
import Card from '@/components/common/Card'

export default function EthereumStage8() {
  const nextStage = 8 < 12 ? 8 + 1 : null
  
  return (
    <StageLayout
      trackName="Ethereum Track"
      trackHref="/ethereum"
      trackColor="ethereum"
      stageNumber={8}
      stageTitle="Stage 8"
      stageDescription="Ethereum learning stage 8"
      nextStageHref={nextStage ? `/ethereum/stage-${nextStage}` : null}
      estimatedTime="15 min"
    >
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Stage 8 Content</h2>
        <p className="text-gray-300">
          This stage is under development. More interactive content coming soon!
        </p>
      </Card>

      <Card className="bg-blue-500/10 border-blue-500/50">
        <h3 className="text-xl font-bold text-white mb-4">🎓 Key Learnings</h3>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 mt-1">✓</span>
            <span>Content for stage 8 will be added</span>
          </li>
        </ul>
      </Card>
    </StageLayout>
  )
}

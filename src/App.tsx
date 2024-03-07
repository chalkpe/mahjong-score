import { FC, useState } from 'react'
import { Space } from 'antd'

import Round from './components/Round'
import useHand from './hooks/useHand'
import Result from './components/Result'
import GuessHan from './components/GuessHan'

const App: FC = () => {
  const [isMangan, setIsMangan] = useState(false)
  const [localYaku, setLocalYaku] = useState(false)

  const [hand, next] = useHand({ isMangan, localYaku })
  const [answerHan, setAnswerHan] = useState<number>()

  if (!hand) return 'Loading...'
  const { result } = hand

  return (
    <Space direction="vertical">
      <Round hand={hand} isMangan={isMangan} setIsMangan={setIsMangan} localYaku={localYaku} setLocalYaku={setLocalYaku} />
      <GuessHan han={result.han} answer={answerHan} setAnswer={setAnswerHan} />
      {answerHan !== undefined && (
        <Result
          hand={hand}
          title={answerHan === result.han ? '맞았습니다!' : '틀렸습니다!'}
          next={() => {
            setAnswerHan(undefined)
            next()
          }}
        />
      )}
    </Space>
  )
}

export default App

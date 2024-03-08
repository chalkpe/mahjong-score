import { FC, useMemo } from 'react'
import { Card, Space, StepProps, Steps } from 'antd'

import Round from './components/Round'
import GuessHan from './components/GuessHan'
import GuessFu from './components/GuessFu'
import GuessTen from './components/GuessTen'
import Result from './components/Result'

import useHand from './hooks/useHand'

import { useAtomValue } from 'jotai'
import { fuAtom, hanAtom, tenAtom } from './store/guess'

interface Progress extends StepProps {
  content: JSX.Element
}

const App: FC = () => {
  const [hand, next] = useHand()

  const han = useAtomValue(hanAtom)
  const fu = useAtomValue(fuAtom)
  const ten = useAtomValue(tenAtom)

  const progress: Progress[] = useMemo(() => {
    if (!hand) return []
    const { result } = hand

    if (result.han >= 5) {
      return [
        {
          title: '판수는?',
          content: <GuessHan han={result.han} />,
          status: han === undefined ? 'wait' : result.han === han ? 'finish' : 'error',
        },
        {
          title: '점수는?',
          content: <GuessTen ten={result.ten} />,
          status: ten === undefined ? 'wait' : result.ten === ten ? 'finish' : 'error',
        },
      ]
    } else {
      return [
        {
          title: '판수는?',
          content: <GuessHan han={result.han} />,
          status: han === undefined ? 'wait' : result.han === han ? 'finish' : 'error',
        },
        {
          title: '부수는?',
          content: <GuessFu fu={result.fu} />,
          status: fu === undefined ? 'wait' : result.fu === fu ? 'finish' : 'error',
        },
        {
          title: '점수는?',
          content: <GuessTen ten={result.ten} />,
          status: ten === undefined ? 'wait' : result.ten === ten ? 'finish' : 'error',
        },
      ]
    }
  }, [fu, han, hand, ten])

  if (!hand || !progress.length) return 'Loading...'

  return (
    <Space direction="vertical">
      <Round hand={hand} />
      <Card>
        <Steps items={progress} />
      </Card>
      {progress.filter((step) => step.status !== 'wait').map((step) => step.content)}
      {progress.some((step) => step.status === 'error') ? (
        <Result hand={hand} title="틀렸습니다!" next={next} />
      ) : progress.every((step) => step.status === 'finish') ? (
        <Result hand={hand} title="맞았습니다!" next={next} />
      ) : (
        progress.find((step) => step.status === 'wait')?.content
      )}
    </Space>
  )
}

export default App

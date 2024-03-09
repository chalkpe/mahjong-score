import { FC, useCallback } from 'react'
import { Button, Card, Space, Statistic } from 'antd'
import { SyncOutlined } from '@ant-design/icons'

import { Hand } from '../hooks/useHand'

import { useAtomValue, useSetAtom } from 'jotai'
import { fuAtom, hanAtom, resetAtom, tenAtom } from '../store/guess'
import { historyAtom } from '../store/history'

interface ResultProps {
  hand: Hand
  title: string
  next: () => void
}

const Result: FC<ResultProps> = ({ hand, title, next }) => {
  const { result } = hand


  const fu = useAtomValue(fuAtom)
  const han = useAtomValue(hanAtom)
  const ten = useAtomValue(tenAtom)

  const reset = useSetAtom(resetAtom)
  const setHistory = useSetAtom(historyAtom)

  const handleNext = useCallback(() => {
    setHistory((history) => [
      ...history,
      {
        fu: [result.fu, fu ?? null],
        han: [result.han, han ?? null],
        ten: [result.ten, ten ?? null],
      },
    ])
    reset()
    next()
  }, [setHistory, reset, next, result.fu, result.han, result.ten, fu, han, ten])

  return (
    <Card
      title={title}
      extra={
        <Button icon={<SyncOutlined />} onClick={handleNext}>
          다음 문제
        </Button>
      }
    >
      <Space direction="horizontal" size="large">
        {result.yakuman ? (
          <Statistic title="부판" value={result.yakuman === 1 ? '역만' : result.yakuman + '배역만'} />
        ) : (
          <Statistic title="부판" value={`${result.fu}부 ${result.han}판`} />
        )}
        <Statistic title="점수" value={result.ten} suffix="점" />
        <Statistic
          title="역"
          value={Object.entries(result.yaku)
            .map(([yaku, han]) => `${yaku} ${han}`)
            .join(', ')}
        />
      </Space>
    </Card>
  )
}

export default Result

import { FC } from 'react'
import { Card, Space, Statistic, Tag } from 'antd'
import Mahgen from './components/Mahgen'
import { HANDS } from './constants/hands'

import Riichi from 'riichi'

const getRandomHand = (): {
  result: Riichi.Result
  type: 'ron' | 'tsumo'
  closed: string
  taken: string
  bakaze: string
  jikaze: string
} => {
  const hand = HANDS[Math.floor(Math.random() * HANDS.length)]

  const result = new Riichi(hand).calc()
  if (!result.isAgari) return getRandomHand()

  const parts = hand.split('+')
  if (parts.length === 3) {
    return {
      result,
      type: 'ron',
      closed: parts[0],
      taken: parts[1],
      bakaze: parts[2][0],
      jikaze: parts[2][1],
    }
  } else {
    return {
      result,
      type: 'tsumo',
      closed: parts[0].slice(0, -2),
      taken: parts[0].slice(-2),
      bakaze: parts[1][0],
      jikaze: parts[1][1],
    }
  }
}

const App: FC = () => {
  const { result, type, closed, taken, bakaze, jikaze } = getRandomHand()

  return (
    <Space direction="vertical">
      <Card title={type === 'ron' ? '론 화료' : '쯔모 화료'}>
        <Space align="end">
          <Statistic title="장풍" value=" " prefix={<Mahgen sequence={bakaze + 'z'} size="small" />} />
          <Statistic title="자풍" value=" " prefix={<Mahgen sequence={jikaze + 'z'} size="small" />} />
          <Statistic title="대기" value=" " prefix={<Mahgen sequence={closed} size="small" />} />
          <Statistic title="오름" value=" " prefix={<Mahgen sequence={taken} size="small" />} />
        </Space>
      </Card>
      <Card>
        <Statistic title="부판" value={result.fu} suffix={`부 ${result.han}판`} />

        {Object.entries(result.yaku).map(([yaku, han]) => (
          <Tag key={yaku}>
            {yaku} {han}
          </Tag>
        ))}
      </Card>
    </Space>
  )
}

export default App

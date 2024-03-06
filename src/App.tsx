import { FC, useState } from 'react'
import { Button, Card, Space, Statistic } from 'antd'

import Riichi from 'riichi'
import Mahgen from './components/Mahgen'

import { HANDS } from './constants/hands'
import translation from './constants/translation'

const calc = (hand: string): Riichi.Result => {
  const result = new Riichi(hand, { allLocalYaku: true }).calc()
  return {
    ...result,
    yaku: Object.fromEntries(
      Object.entries(result.yaku).map(([k, v]) => [
        translation[k],
        v.replace('飜', '판').replace('倍役満', '배역만').replace('役満', '역만'),
      ])
    ),
  }
}

const getRandomHand = (): {
  result: Riichi.Result
  type: 'ron' | 'tsumo'
  closed: string
  taken: string
  bakaze: string
  jikaze: string
} => {
  const hand = HANDS[Math.floor(Math.random() * HANDS.length)]

  const result = calc(hand)
  if (!result.isAgari || !Object.keys(result.yaku).length) return getRandomHand()

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
  const [{ result, type, closed, taken, bakaze, jikaze }] = useState(getRandomHand())
  const [answerHan, setAnswerHan] = useState<number>()

  return (
    <Space direction="vertical">
      <Card title={type === 'ron' ? '론 화료' : '쯔모 화료'}>
        <Space>
          <Statistic title="장풍" value=" " prefix={<Mahgen sequence={bakaze + 'z'} size="small" />} />
          <Statistic title="자풍" value=" " prefix={<Mahgen sequence={jikaze + 'z'} size="small" />} />
          <Statistic title="대기" value=" " prefix={<Mahgen sequence={closed} size="small" />} />
          <Statistic title="오름" value=" " prefix={<Mahgen sequence={taken} size="small" />} />
        </Space>
      </Card>

      <Card title="판수는?">
        <Space>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
            <Button
              key={i}
              onClick={() => setAnswerHan(i)}
              danger={answerHan === i && i !== result.han}
              type={answerHan === i ? 'primary' : undefined}
            >
              {i}
            </Button>
          ))}
        </Space>
      </Card>

      {answerHan !== undefined && (
        <Card title={answerHan === result.han ? '맞았습니다!' : '틀렸습니다!'}>
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
      )}
    </Space>
  )
}

export default App

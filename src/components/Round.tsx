import { FC } from 'react'
import { Card, Space, Statistic } from 'antd'

import Mahgen from './Mahgen'
import { Hand } from '../hooks/useHand'

interface RoundProps {
  hand: Hand
}

const Round: FC<RoundProps> = ({ hand }) => {
  const { type, closed, taken, bakaze, jikaze } = hand
  return (
    <Card title={type === 'ron' ? '론 화료' : '쯔모 화료'}>
      <Space>
        <Statistic title="장풍" value=" " prefix={<Mahgen sequence={bakaze + 'z'} size="small" />} />
        <Statistic title="자풍" value=" " prefix={<Mahgen sequence={jikaze + 'z'} size="small" />} />
        <Statistic title="대기" value=" " prefix={<Mahgen sequence={closed} size="small" />} />
        <Statistic title="오름" value=" " prefix={<Mahgen sequence={taken} size="small" />} />
      </Space>
    </Card>
  )
}

export default Round
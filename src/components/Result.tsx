import { FC } from 'react'
import { Card, Space, Statistic } from 'antd'
import { Hand } from '../hooks/useHand'

interface ResultProps {
  hand: Hand
  title: string
}

const Result: FC<ResultProps> = ({ hand, title }) => {
  const { result } = hand
  return (
    <Card title={title}>
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

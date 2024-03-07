import { Dispatch, FC, SetStateAction } from 'react'
import { Card, Space, Statistic, Switch } from 'antd'

import Mahgen from './Mahgen'
import { Hand } from '../hooks/useHand'

interface RoundProps {
  hand: Hand
  isMangan: boolean
  setIsMangan: Dispatch<SetStateAction<boolean>>
  localYaku: boolean
  setLocalYaku: Dispatch<SetStateAction<boolean>>
}

const Round: FC<RoundProps> = ({ hand, isMangan, setIsMangan, localYaku, setLocalYaku }) => {
  const { type, closed, taken, bakaze, jikaze } = hand
  return (
    <Card
      title="화료"
      extra={
        <Space>
          <Switch checkedChildren="만관" unCheckedChildren="전부" value={isMangan} onChange={setIsMangan} />
          <Switch checkedChildren="로컬" unCheckedChildren="보통" value={localYaku} onChange={setLocalYaku} />
        </Space>
      }
    >
      <Space size="middle">
        <Statistic title="장풍" value=" " prefix={<Mahgen sequence={bakaze + 'z'} size="small" />} />
        <Statistic title="자풍" value=" " prefix={<Mahgen sequence={jikaze + 'z'} size="small" />} />
        <Statistic title="대기" value=" " prefix={<Mahgen sequence={closed} size="small" />} />
        <Statistic title={type === 'ron' ? '론' : '쯔모'} value=" " prefix={<Mahgen sequence={taken} size="small" />} />
      </Space>
    </Card>
  )
}

export default Round

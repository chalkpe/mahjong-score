import { FC } from 'react'
import { Card, Space, Statistic, Switch } from 'antd'

import Mahgen from './Mahgen'
import { Hand } from '../hooks/useHand'

import { useAtom, useSetAtom } from 'jotai'
import { resetAtom } from '../store/guess'
import { isLocalYakuAtom, isManganAtom } from '../store/mode'

interface RoundProps {
  hand: Hand
}

const Round: FC<RoundProps> = ({ hand }) => {
  const reset = useSetAtom(resetAtom)
  const [isMangan, setIsMangan] = useAtom(isManganAtom)
  const [isLocalYaku, setIsLocalYaku] = useAtom(isLocalYakuAtom)

  const { type, closed, taken, bakaze, jikaze } = hand
  return (
    <Card
      title="화료"
      extra={
        <Space>
          <Switch
            checkedChildren="만관"
            unCheckedChildren="전부"
            value={isMangan}
            onChange={(value) => {
              reset()
              setIsMangan(value)
            }}
          />
          <Switch
            checkedChildren="로컬"
            unCheckedChildren="보통"
            value={isLocalYaku}
            onChange={(value) => {
              reset()
              setIsLocalYaku(value)
            }}
          />
        </Space>
      }
    >
      <Space wrap>
        <Space>
          <Statistic title="장풍" value=" " prefix={<Mahgen sequence={bakaze + 'z'} size={1} />} />
          <Statistic title="자풍" value=" " prefix={<Mahgen sequence={jikaze + 'z'} size={1} />} />
        </Space>
        <Space>
          <Statistic title="대기" value=" " prefix={<Mahgen sequence={closed} size={13} />} />
          <Statistic title={type === 'ron' ? '론' : '쯔모'} value=" " prefix={<Mahgen sequence={taken} size={1} />} />
        </Space>
      </Space>
    </Card>
  )
}

export default Round

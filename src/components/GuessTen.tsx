import { FC, useState } from 'react'
import { Button, Card, InputNumber, Space } from 'antd'
import { useAtom } from 'jotai'
import { tenAtom } from '../store/guess'

interface GuessTenProps {
  ten: number
}

const GuessTen: FC<GuessTenProps> = ({ ten }) => {
  const [input, setInput] = useState<number | null>(null)
  const [answer, setAnswer] = useAtom(tenAtom)
  return (
    <Card title={'점수는?'}>
      <Space>
        <InputNumber disabled={answer !== undefined} min={0} step={100} placeholder="점수" value={input} onChange={setInput} />
        <Button
          disabled={input === null}
          type={answer !== undefined ? 'primary' : undefined}
          danger={answer !== undefined && answer !== ten}
          onClick={() => input !== null && setAnswer(input)}
        >
          제출
        </Button>
      </Space>
    </Card>
  )
}

export default GuessTen

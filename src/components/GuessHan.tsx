import { FC } from 'react'
import { Button, Card, Space } from 'antd'
import { useAtom } from 'jotai'
import { hanAtom } from '../store/guess'

interface GuessHanProps {
  han: number
}

const GuessHan: FC<GuessHanProps> = ({ han }) => {
  const [answer, setAnswer] = useAtom(hanAtom)
  return (
    <Card title={"판수는?"}>
      <Space wrap>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
          <Button
            key={i}
            danger={answer === i && i !== han}
            type={answer === i ? 'primary' : undefined}
            onClick={() => answer === undefined && setAnswer(i)}
          >
            {i}
          </Button>
        ))}
      </Space>
    </Card>
  )
}

export default GuessHan

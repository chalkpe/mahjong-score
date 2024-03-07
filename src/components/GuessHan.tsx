import { Dispatch, FC, SetStateAction } from 'react'
import { Button, Card, Space } from 'antd'

interface GuessHanProps {
  han: number
  answer: number | undefined
  setAnswer: Dispatch<SetStateAction<number | undefined>>
}

const GuessHan: FC<GuessHanProps> = ({ han, answer, setAnswer }) => {
  return (
    <Card title="판수는?">
      <Space>
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

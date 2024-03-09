import { FC } from 'react'
import { Button, Card, Space } from 'antd'
import { useAtom } from 'jotai'
import { fuAtom } from '../store/guess'

interface GuessFuProps {
  fu: number
}

const GuessFu: FC<GuessFuProps> = ({ fu }) => {
  const [answer, setAnswer] = useAtom(fuAtom)
  return (
    <Card title={"부수는?"}>
      <Space wrap>
        {[20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130].map((i) => (
          <Button
            key={i}
            danger={answer === i && i !== fu}
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

export default GuessFu

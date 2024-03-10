import { FC } from 'react'
import { Button, Card, Space, Table, Typography } from 'antd'

import { useAtom } from 'jotai'
import { historyAtom } from '../store/history'
import { CheckOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons'

export const History: FC = () => {
  const [history, setHistory] = useAtom(historyAtom)

  const diff = ([expected, actual]: [number, number | null], suffix: string) => (
    <Typography.Text type={actual === null ? 'secondary' : expected === actual ? 'success' : 'danger'}>
      <Space wrap>
        {actual === null ? <MinusOutlined /> : expected === actual ? <CheckOutlined /> : <CloseOutlined />}
        <strong>
          {expected}
          {suffix}
        </strong>
        <span>{actual !== null && `(${actual}${suffix})`}</span>
      </Space>
    </Typography.Text>
  )

  return (
    <Card
      title="기록"
      styles={{ body: { padding: 0, overflow: 'hidden' } }}
      extra={
        <Button onClick={() => setHistory([])} danger>
          리셋
        </Button>
      }
    >
      <Table
        pagination={false}
        dataSource={history.slice().reverse()}
        columns={[
          { title: '판수', dataIndex: 'han', render: (han) => diff(han, '판') },
          { title: '부수', dataIndex: 'fu', render: (fu) => diff(fu, '부') },
          { title: '점수', dataIndex: 'ten', render: (ten) => diff(ten, '점') },
        ]}
      />
    </Card>
  )
}

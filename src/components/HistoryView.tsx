import { FC } from 'react'
import { Button, Card, Space, Table, Typography } from 'antd'

import { useAtom } from 'jotai'
import { historyAtom, History } from '../store/history'
import { CheckOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons'

const HistoryView: FC = () => {
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
          {
            title: '유형',
            render: (history: History) =>
              // 이전 버전에는 없는 필드라서 타입 정의와는 무관하게 널 체크
              history.jikaze && history.type ? (
                <strong>
                  {' 동남서북'[history.jikaze]}가 {history.type === 'tsumo' ? '쯔모' : '론'}
                </strong>
              ) : (
                <Typography.Text type="secondary">데이터 없음</Typography.Text>
              ),
          },
          { title: '판수', dataIndex: 'han', render: (han) => diff(han, '판') },
          { title: '부수', dataIndex: 'fu', render: (fu) => diff(fu, '부') },
          { title: '점수', dataIndex: 'ten', render: (ten) => diff(ten, '점') },
        ]}
      />
    </Card>
  )
}

export default HistoryView

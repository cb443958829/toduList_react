import React from 'react'
import { Card, Button, Space } from 'antd'
import './footer.css'
export default class Footer extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <Card>
        <Space className='space'>
          <span>共有5条未处理</span>
          <Button type='primary'>全部事件</Button>
          <Button>未处理</Button>
          <Button>已经处理</Button>
          <Button>清除已处理</Button>
        </Space>
      </Card>
    )
  }
}

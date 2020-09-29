import React from 'react'
import { Button, Card, Checkbox, List, Space } from 'antd'
import './listSection.css'
export default class ListSection extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [1, 2, 3, 4],
    }
  }
  onChange() {}
  render() {
    return (
      <div className='listSection'>
        <Card style={{ borderRadius: '10px' }}>
          <List
            split
            dataSource={this.state.data}
            renderItem={(item) => (
              <List.Item>
                <Checkbox onChange={this.onChange} className='checkbox'></Checkbox>
                <span>{item}</span>
                <div>
                  <Space>
                    <Button shape="round" type='primary'>查看</Button>
                    <Button shape="round" className='modify' type='default'>修改</Button>
                    <Button shape="round" danger>删除</Button>
                  </Space>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    )
  }
}

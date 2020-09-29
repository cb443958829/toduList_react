import React from 'react'
import { Input, Space, Button } from 'antd'
import Validate from '../validate'
import './inputSection.css'
const { TextArea } = Input
export default class InputSection extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div className='inputSection'>
        <section>
          <Space>
            <span class='iconfont icon-daxiongmao-01'></span>标题
          </Space>
          <TextArea style={{ borderRadius: '10px' }} />
        </section>
        <Validate />
        <section>
          <Space>
            <span class='iconfont icon-huli-01'></span>内容
          </Space>
          <TextArea style={{ borderRadius: '10px' }} />
        </section>
        <Validate />
        <section>
          <Space>
            <span class='iconfont icon-laohu-01'></span>时间
          </Space>
          <TextArea style={{ borderRadius: '10px' }} />
        </section>
        <Validate />
        <section>
          <Space>
            <span class='iconfont icon-gougou-01'></span>地点
          </Space>
          <TextArea style={{ borderRadius: '10px' }} />
        </section>
        <Validate />
        <Button type='primary' className='btn'>
          添加事件
        </Button>
      </div>
    )
  }
}

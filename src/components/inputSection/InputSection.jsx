import React from 'react'
import { connect } from 'react-redux'
import { Input, Space, Button } from 'antd'
import { addData } from '../../redux/reactions'
import Validate from '../validate'
import './inputSection.css'

const { TextArea } = Input
class InputSection extends React.Component {
  constructor() {
    super()
    this.state = {
      validate: {
        title: false,
        content: false,
        time: false,
        pos: false,
      },
      isOk: false,
      flagType: '',
      msg: '',
      // 验证相关提示信息数据
      msgData: {
        title: {
          msg1: '请输入标题',
          msg2: '标题添加成功',
          msg3: '输入格式不正确,输入的字符数至少3个',
        },
        content: {
          msg1: '请输入内容',
          msg2: '内容添加成功',
        },
        time: {
          msg1: '请输入时间',
          msg2: '时间添加成功',
        },
        pos: {
          msg1: '请输入地点',
          msg2: '地点添加成功',
        },
        total: {
          msg1: '请完善信息',
          msg2: '添加信息成功',
        },
      },
      formData: {
        title: '',
        content: '',
        time: '',
        pos: '',
        isDone: false,
      },
    }
    // this.inputTitle2 = React.createRef()
  }
  componentDidMount() {}
  // 绑定输入框对象
  handleChange(type, e) {
    const value = e.target.value.trim()
    const newFormData = {}
    // console.log(type, value)
    this.setState((preState) => {
      const { formData } = preState
      Object.keys(formData).forEach((key) => {
        if (key === type) {
          newFormData[key] = value
        } else {
          newFormData[key] = formData[key]
        }
      })
      return { formData: newFormData }
    })
  }
  // 添加数据
  add() {
    const { validate, msgData } = this.state
    let isOk = true
    Object.values(validate).forEach((value) => {
      isOk *= value
    })
    if (isOk) {
      this.props.addData(this.state.formData)
      this.setState({
        msg: msgData.total.msg2,
        formData: {
          title: '',
          content: '',
          time: '',
          pos: '',
          isDone: false,
        },
        validate: {
          title: false,
          content: false,
          time: false,
          pos: false,
        },
      })
    } else {
      this.setState({
        msg: msgData.total.msg1,
        flagType: 'msgerror',
      })
    }
  }
  // 输入框验证
  validate(type, e) {
    var msg = e.target.value
    const { msgData } = this.state
    if (!msg) {
      this.setState({
        msg: msgData[type].msg1,
        flagType: 'msgerror',
      })
    } else {
      if (type === 'title' && msg.length < 3) {
        this.setState((preState) => {
          const { validate } = preState
          validate[type] = false
          return {
            validate,
            msg: msgData[type].msg3,
            flagType: 'msgerror',
          }
        })
      } else {
        this.setState((preState) => {
          const { validate } = preState
          validate[type] = true
          return {
            validate,
            msg: msgData[type].msg2,
            flagType: 'msgsuccess',
          }
        })
      }
    }
  }
  render() {
    const { title, content, time, pos } = this.state.formData
    const { flagType, msg } = this.state
    return (
      <div className='inputSection'>
        <div className={flagType === 'msgsuccess' ? 'msgsuccess' : 'msgerror'}>{msg}</div>
        <section>
          <Space>
            <span className='iconfont icon-daxiongmao-01'></span>标题
          </Space>
          <TextArea value={title} onBlur={this.validate.bind(this, 'title')} onChange={this.handleChange.bind(this, 'title')} style={{ borderRadius: '10px' }} />
        </section>
        <Validate />
        <section>
          <Space>
            <span className='iconfont icon-huli-01'></span>内容
          </Space>
          <TextArea value={content} onBlur={this.validate.bind(this, 'content')} onChange={this.handleChange.bind(this, 'content')} style={{ borderRadius: '10px' }} />
        </section>
        <Validate />
        <section>
          <Space>
            <span className='iconfont icon-laohu-01'></span>时间
          </Space>
          <TextArea value={time} onBlur={this.validate.bind(this, 'time')} onChange={this.handleChange.bind(this, 'time')} style={{ borderRadius: '10px' }} />
        </section>
        <Validate />
        <section>
          <Space>
            <span className='iconfont icon-gougou-01'></span>地点
          </Space>
          <TextArea value={pos} onBlur={this.validate.bind(this, 'pos')} onChange={this.handleChange.bind(this, 'pos')} style={{ borderRadius: '10px' }} />
        </section>
        <Validate />
        <Button onClick={this.add.bind(this)} type='primary' className='btn'>
          添加事件
        </Button>
      </div>
    )
  }
}

export default connect((state) => ({ state }), { addData })(InputSection)

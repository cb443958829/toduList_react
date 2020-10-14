import React from 'react'
import { connect } from 'react-redux'
import { Button, Card, Checkbox, List, Space, Modal, Input } from 'antd'
import { modify, delData, modifyState } from '../../redux/reactions'
import './listSection.css'
const { TextArea } = Input
class ListSection extends React.Component {
  constructor() {
    super()
    this.inputTitle = React.createRef()
  }
  state = {
    loading: false,
    loading1: false,
    visible: false,
    visible1: false,
    visible2: false,
    title: '',
    content: '',
    time: '',
    isDone: '',
    type: '',
    flagId: 0,
    counted: 0,
    showData: [],
    validate: {
      title: true,
      content: true,
      time: true,
      pos: true,
    },
    isOk: false,
    flagType: '',
    msg: '',
    // 验证相关提示信息数据
    msgData: {
      title: {
        msg1: '请输入标题',
        msg2: '标题修改成功',
        msg3: '输入格式不正确,输入的字符数至少3个',
      },
      content: {
        msg1: '请输入内容',
        msg2: '内容修改成功',
      },
      time: {
        msg1: '请输入时间',
        msg2: '时间修改成功',
      },
      pos: {
        msg1: '请输入地点',
        msg2: '地点修改成功',
      },
      total: {
        msg1: '请完善信息',
        msg2: '修改信息成功',
      },
    },
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  showModal1 = () => {
    this.setState({
      visible1: true,
    })
  }
  showModal2 = () => {
    this.setState({
      visible2: true,
    })
  }
  handleOk = () => {
    const { validate, msgData } = this.state
    const { modify } = this.props

    let isOk = true
    Object.values(validate).forEach((value) => {
      isOk *= value
    })
    if (isOk) {
      this.setState({ loading: true })
      setTimeout(() => {
        this.setState({ loading: false, visible: false, msg: '' })
      }, 1000)
      const objData = {}
      Object.keys(this.state).forEach((key) => {
        switch (key) {
          case 'title':
            objData[key] = this.state[key]
            break
          case 'content':
            objData[key] = this.state[key]
            break
          case 'time':
            objData[key] = this.state[key]
            break
          case 'pos':
            objData[key] = this.state[key]
            break
          case 'isDone':
            objData[key] = this.state[key]
            break
          case 'flagId':
            objData[key] = this.state[key]
            break
          default:
            return
        }
      })

      modify(objData)

      this.setState({
        msg: msgData.total.msg2,
        flagType: 'msgsuccess',
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

  handleCancel = () => {
    const { type } = this.state
    if(type === 'modify') {
      this.showModal2()
    } else {
      this.setState({ visible: false, msg: '' })
    }
  }
  // del 对话框
  handleOk1 = () => {
    this.setState({ loading: true })
    const { modifyState } = this.props
    const { flagId, isDone } = this.state
    setTimeout(() => {
      this.setState({ loading: false, visible1: false })
      modifyState({ flagId, isDone })
    }, 1000)
  }
  handleCancel1 = () => {
    this.setState({ visible1: false })
  }
  handleOk2 = () => {
    this.setState({ loading1: true })
    setTimeout(() => {
      this.setState({ loading1: false, visible2: false, visible: false })
    }, 1000)
  }
  handleCancel2 = () => {
    this.setState({ visible2: false })
  }
  // 处理列表区内容显示
  handleType(id, type) {
    this.setState({
      validate: {
        title: true,
        content: true,
        time: true,
        pos: true,
      }
    })
    const { storeData } = this.props
    this.showModal()
    storeData.forEach((item) => {
      const { title, content, time, pos, isDone } = item
      if (item.id === id) {
        this.setState({
          title,
          content,
          time,
          pos,
          type,
          isDone,
          flagId: id,
        })
      }
    })
  }
  // 处理列表区修改功能
  handleChange(type, e) {
    let value = ''
    if (type !== 'isDone') {
      if(!e.target.value || (type ==='title' && e.target.value.trim().lenght <3)) {
        this.setState((preState) => {
          const { validate } = preState
          validate[type] = false
          return {
            validate
          }
        })
      } 
      value = e.target.value
    } else if (type === 'isDone') {
      value = e.target.checked
      console.log(value)
    }
    this.setState({
      [type]: value,
    })
  }

  toggle(id, e) {
    this.setState({
      flagId: id,
      isDone: e.target.checked,
    })
    this.showModal1()
  }
  componentDidMount() {}
  // 验证
  validate(type, e) {
    var value = e.target.value
    const { msgData } = this.state
    console.log(type)
    if (!value) {
      this.setState((preState) => {
        const { validate } = preState
        validate[type] = false
        return {
          validate,
          msg: msgData[type].msg1,
          flagType: 'msgerror',
        }
      })
    } else {
      if (type === 'title' && value.length < 3) {
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
    const { visible, loading, title, content, time, pos, type, isDone, visible1, visible2, flagType, msg } = this.state
    const { storeData, typeData, delData } = this.props
    let showData = []
    console.log(typeData)
    if (typeData === 'all') {
      showData = storeData
    } else if (typeData === 'undone') {
      showData = storeData.filter((item) => !item.isDone)
    } else if (typeData === 'done') {
      showData = storeData.filter((item) => item.isDone)
    } else {
      showData = storeData
    }
    return (
      <div className='listSection'>
        <Card style={{ borderRadius: '10px' }}>
          <List
            split
            dataSource={showData}
            renderItem={(item) => (
              <List.Item>
                <Checkbox checked={item.isDone} className='checkbox' onChange={this.toggle.bind(this, item.id)}></Checkbox>
                <span>{item.content}</span>
                <div>
                  <Space>
                    <Button onClick={this.handleType.bind(this, item.id, 'see')} style={{ marginLeft: 30 }} shape='round' type='primary'>
                      查看
                    </Button>
                    <Button onClick={this.handleType.bind(this, item.id, 'modify')} shape='round' className='modify' type='default'>
                      修改
                    </Button>
                    <Button onClick={delData.bind(this, item.id)} shape='round' danger>
                      删除
                    </Button>
                  </Space>
                </div>
              </List.Item>
            )}
          />
        </Card>
        <Modal
          visible={visible}
          title='事件详情'
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='返回' onClick={this.handleCancel}>
              返回
            </Button>,
            <Button key='确定' type='primary' loading={loading} onClick={this.handleOk}>
              确定
            </Button>,
          ]}
        >
          {type === 'see' ? (
            <div>
              <span>标题</span>
              <p>{title}</p>
              <span>内容</span>
              <p>{content}</p>
              <span>时间</span>
              <p>{time}</p>
              <span>地点</span>
              <p>{pos}</p>
            </div>
          ) : (
            <div>
              <div className={flagType === 'msgsuccess' ? 'msgsuccess' : 'msgerror'}>{msg}</div>
              <span>标题</span>
              <Input onChange={this.handleChange.bind(this, 'title')} onBlur={this.validate.bind(this, 'title')} value={title} />
              <span>内容</span>
              <TextArea onChange={this.handleChange.bind(this, 'content')} onBlur={this.validate.bind(this, 'content')} value={content} rows={4} />
              <span>时间</span>
              <Input onChange={this.handleChange.bind(this, 'time')} onBlur={this.validate.bind(this, 'time')} value={time} rows={1} />
              <span>地点</span>
              <TextArea onChange={this.handleChange.bind(this, 'pos')} onBlur={this.validate.bind(this, 'pos')} value={pos} rows={2} />
              <div className='blank'></div>
              <Checkbox checked={isDone} onChange={this.handleChange.bind(this, 'isDone')} className='checkbox'></Checkbox>
            </div>
          )}
        </Modal>
        <Modal
          visible={visible1}
          title='状态确认'
          onOk={this.handleOk1}
          onCancel={this.handleCancel1}
          footer={[
            <Button key='取消' onClick={this.handleCancel1}>
              返回
            </Button>,
            <Button key='确定' type='primary' loading={loading} onClick={this.handleOk1}>
              确定
            </Button>,
          ]}
        >
          <span>确定要修改当前事件状态吗</span>
        </Modal>
        <Modal
          visible={visible2}
          title='修改取消'
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
          footer={[
            <Button key='取消' onClick={this.handleCancel2}>
              返回
            </Button>,
            <Button key='确定' type='primary' loading={loading} onClick={this.handleOk2}>
              确定
            </Button>,
          ]}
        >
          <span>是否取消修改当前事件</span>
        </Modal>
      </div>
    )
  }
}

export default connect((state) => ({ storeData: state.storeData, typeData: state.typeData }), { modify, delData, modifyState })(ListSection)

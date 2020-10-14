import React from 'react'
import { handleShow } from '../../redux/reactions'
import { Card, Button, Space } from 'antd'
import './footer.css'
import { connect } from 'react-redux'
class Footer extends React.Component {
  constructor() {
    super()
    this.state = {
      unDoneCount: 0,
      type:'all'
    }
  }
  componentDidMount() {
    const { storeData } = this.props
    // console.log(storeData)
    const unDoneCount = storeData.reduce((count, item) => {
      if (!item.isDone) {
        count++
      }
      return count
    }, 0)
    this.setState({
      unDoneCount,
    })
  }
  componentDidUpdate(preProps) {
    const preStoreData = preProps.storeData
    const { storeData } = this.props
  // console.log(this.props.handleShow)
    
    const unDoneCount = storeData.reduce((count, item) => {
      if (!item.isDone) {
        count++
      }
      return count
    }, 0)
    
    const preUnDoneCount = preStoreData.reduce((count, item) => {
      if (!item.isDone) {
        count++
      }
      return count
    }, 0)
    if (preUnDoneCount !== unDoneCount) {
      this.setState({
        unDoneCount,
      })
      // console.log(preStoreData[0], storeData[0])
    }
  }
  

  render() {
    const { unDoneCount } = this.state
    const { handleShow, typeData } = this.props

    return (
      <Card>
        <Space className='space'>
          <span>共有{unDoneCount}条未处理</span>
          <Button type={ typeData === 'all'? 'primary': 'default'} onClick={handleShow.bind(this, 'all')}>全部事件</Button>
          <Button type={ typeData === 'undone'? 'primary': 'default'} onClick={handleShow.bind(this, 'undone')}>未处理 </Button>
          <Button type={ typeData === 'done'? 'primary': 'default'} onClick={handleShow.bind(this, 'done')}>已经处理</Button>
          <Button type={ typeData === 'del'? 'primary': 'default'} onClick={handleShow.bind(this, 'del')}>清除已处理</Button>
        </Space>
      </Card>
    )
  }
}
export default connect((state) => ({ storeData: state.storeData, typeData: state.typeData }), { handleShow })(Footer)

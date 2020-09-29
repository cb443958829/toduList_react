import React from 'react'
import Footer from './components/footer/Footer'
import Header from './components/inputSection/InputSection'
import List from './components/list/ListSection'
import { Card } from 'antd'
import './App.css'

function App() {
  return (
    <div className='cardPostion'>
      <Card style={{ width: '100%', border: '1px solid rgba(0, 0, 0, 0.1)', margin: 'o auto', borderRadius: '10px' }}>
        <p className='title'>待办事宜记录本</p>
        <Header></Header>
      </Card>
      <List></List>
      <Footer></Footer>
    </div>
  )
}

export default App

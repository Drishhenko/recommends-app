import React from 'react'
import {Container} from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import OverviewTop from '../components/OverviewTop'

const MainPage = () => {
  return (
    <Container>
      <TypeBar/>
      <OverviewTop/>
    </Container>
  )
}

export default MainPage

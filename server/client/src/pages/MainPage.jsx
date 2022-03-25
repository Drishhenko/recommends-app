import React, { useContext, useEffect } from 'react'
import {observer} from "mobx-react-lite";
import { Context } from '..'
import { fetchOverviews, fetchTypes } from '../http/oveviewAPI'
import TypeBar from '../components/TypeBar'
import OverviewTop from '../components/OverviewTop'
import OverviewLast from '../components/OverviewLast'
import {Container, Tab, Tabs} from 'react-bootstrap'

const MainPage = observer(() => {
  const {overview} = useContext(Context)


  useEffect(() => {
    fetchTypes().then(data => overview.setTypes(data))
    fetchOverviews().then(data => overview.setOverviews(data))
  }, [])

  useEffect(() => {
    fetchOverviews(overview.selectedType.id).then(data => overview.setOverviews(data))
  }, [overview.selectedType])

  
  return (
    <Container>
      <TypeBar/>
      <Tabs defaultActiveKey='top' variant="pills" style={{fontSize: 20}}>
        <Tab eventKey='top' title='Топовые обзоры' >
          <OverviewTop/>
        </Tab>
        <Tab eventKey='last' title='Последние обзоры'>
          <OverviewLast/>
        </Tab>
      </Tabs>
    </Container>
  )
})

export default MainPage

import React, { useContext, useEffect } from 'react'
import {observer} from "mobx-react-lite";
import TypeBar from '../components/TypeBar'
import OverviewTop from '../components/OverviewTop'
import { fetchOverviews, fetchTypes } from '../http/oveviewAPI'
import { Context } from '..'
import {Container} from 'react-bootstrap'

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
      <OverviewTop/>
    </Container>
  )
})

export default MainPage

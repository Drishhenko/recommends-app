import React, { useEffect, useState, useContext }from 'react'
import { observer } from "mobx-react-lite";
import { useParams} from 'react-router-dom'
import {fetchOneUser} from '../http/userAPI'
import TypeBar from '../components/TypeBar'
import OverviewItem from "../components/OverviewItem";
import { fetchOverviews, fetchTypes } from '../http/oveviewAPI'
import { Context } from '..'
import { Card, Container} from 'react-bootstrap'


const UserPage = observer(() => {
  const {overview} = useContext(Context)
  const [user, setUser]= useState({})
  const {id} = useParams()
 
  useEffect(() => {
    fetchOneUser(id).then(data => setUser(data))
  }, [])

  useEffect(() => {
    fetchTypes().then(data => overview.setTypes(data))
  }, [])

  useEffect(() => {
    fetchOverviews(overview.selectedType.id).then(data => overview.setOverviews(data))
  }, [overview.selectedType])


  let userOverviews = overview.overviews.filter(item => item.userId === user.userId)
  let newOverviews = []

  for (let item of userOverviews) {
    let ratingsArray = []
    for ( let rate of item.overalRating) {
      ratingsArray.push(rate.rate)
    } 
    if(ratingsArray.length > 1) {
      item['averageRating'] = ratingsArray.reduce((a, b) => (a+b))/ratingsArray.length
      newOverviews.push(item)
    } else {
      item['averageRating'] = ratingsArray[0]
      newOverviews.push(item)
    }
  }

  console.log('user', user)

  return ( 
    <Container>
      <Card>
        <Card.Header>
          <h1>
            {user.name}
          </h1>          
        </Card.Header>
        <TypeBar/>
        <h2>Последние обзоры</h2>
      {newOverviews.sort((a, b) => a.averageRating < b.averageRating ? 1 : -1).map(i => 
        <OverviewItem key={i.id} overview={i}/>
      )}
      </Card>
      
    </Container>
  )
})

export default UserPage

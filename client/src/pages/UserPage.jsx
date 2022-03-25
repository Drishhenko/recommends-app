import React, { useEffect, useState, useContext }from 'react'
import { observer } from "mobx-react-lite";
import { useParams, useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {fetchOneUser} from '../http/userAPI'
import {deleteOneOwverview} from '../http/oveviewAPI'
import TypeBar from '../components/TypeBar'
import OverviewItem from "../components/OverviewItem";
import { fetchOverviews, fetchTypes } from '../http/oveviewAPI'
import { Context } from '..'
import { Card, Container, Button} from 'react-bootstrap'


const UserPage = observer(() => {
  const { t } = useTranslation()
  const {overview} = useContext(Context)
  const [user, setUser]= useState({})
  const {id} = useParams()
  const deleteClick = async (id) => {
    await deleteOneOwverview(id)
    window.location.reload()
  }
 
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

  return ( 
    <Container>
      <Card>
        <Card.Header>
          <h2>
            {user.name}
          </h2>  
        </Card.Header>
        <Card.Body>
          <TypeBar/>
        <h2 style={{textAlign:'center'}}>{t('Last reviews')}</h2>
      {newOverviews.sort((a, b) => a.averageRating < b.averageRating ? 1 : -1).map(i => 
        <>
        <OverviewItem key={i.id} overview={i}/>
        <Button variant="danger" className='w-25' onClick={() => deleteClick(i.id)}>{t('Delete review')}</Button>        
        </>
        )}
        </Card.Body>
        
      </Card>
      
    </Container>
  )
})

export default UserPage

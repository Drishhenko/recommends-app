import React, { useEffect, useState } from 'react'
import { Card, Container, Image } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { fetchOneOverview } from '../http/oveviewAPI'

const OverviewPage = () => {
const [overview, setOverview]= useState({img: []})
const {id} = useParams()
useEffect(() => {
  fetchOneOverview(id).then(data => setOverview(data))
}, [])
  console.log('overview.img',overview)
  
  return (
    <Container>
      <Card>
        <Card.Title>name</Card.Title>
        <Card.Body>
          <div style={{ width: 100, height: 100, backgroundColor:'lightgray'}}> user </div>
          <div style={{ width: 100, height: 100, backgroundColor:'lightgray'}}> {overview.name}</div>
          <div>img
            {overview.img.map(img => 
            <Image key={img.id} src={process.env.REACT_APP_API_URL + img.name}/>
              )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default OverviewPage

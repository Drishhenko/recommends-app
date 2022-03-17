import React, { useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite'
import { Card, Container, Image, Form, Button } from 'react-bootstrap'
import { useParams} from 'react-router-dom'
import { fetchOneOverview } from '../http/oveviewAPI'
import star from "../imgs/icon-star.png";
import { createRate } from '../http/oveviewAPI'

const OverviewPage = observer(() => {
const [overview, setOverview]= useState({img: []})
const {id} = useParams()
useEffect(() => {
  fetchOneOverview(id).then(data => setOverview(data))
}, [])

const [rate, setRate] = useState('')

const addRate = () => {
  const formData = new FormData()
  formData.append('rate', rate)
  formData.append('userId', localStorage.getItem('id'))
  formData.append('overviewId', overview.id)
  createRate(formData)
  
}

const mathOveralRating = (rating) => {
  let ratingsArray = []
  rating.forEach( rate => ratingsArray.push(rate.rate))
  return ratingsArray.reduce((a, b) => (a+b))/ratingsArray.length
}



  return (
    <Container>
      <Card>
        <Card.Title>{overview.name}</Card.Title>
        <Card.Body className='d-flex'>
          <div style={{ width: 100, height: 50, backgroundColor:'lightgray'}}> user {overview.rating}
            <Image src={star} />
          </div>
          <div style={{ width: 100, height: 50, backgroundColor:'lightgray'}}> {overview.overalRating && mathOveralRating(overview.overalRating)}
          </div>
        </Card.Body>
        <Card.Text>
          <div>
            {overview.img.map(img => 
            <Image style={{ width: 400}} key={img.id} src={process.env.REACT_APP_API_URL + img.name}/>
              )}
          </div>
          {overview.text}
        </Card.Text>
        <div>
          <Form.Range style={{width:200, marginBottom: 10}} min="0" max="5" value={rate} onChange={e => setRate(e.target.value)}/>
          <Button  variant="dark" style={{width: 200}} onClick={addRate}>Оценить</Button>
        </div>
      </Card>
    </Container>
  )
})

export default OverviewPage

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
  if(ratingsArray.length > 1) {
    return ratingsArray.reduce((a, b) => (a+b))/ratingsArray.length
  } else return ratingsArray[0]
}
  return (
    <Container>
      <Card>
        <Card.Header style={{fontSize: 26, textAlign: 'center'}}>{overview.name}</Card.Header>
        <Card.Body className='d-flex justify-content-around'>
          <div className='d-flex align-items-center'> 
            Оценка user {overview.rating}
            <Image src={star} />
          </div>
          <div className='d-flex align-items-center'> Средняя оценка {overview.overalRating && mathOveralRating(overview.overalRating)}
          <Image src={star} />
          </div>
        </Card.Body>
        <Card.Text>
          <div className='d-flex flex-wrap justify-content-around'>
            {overview.img.map(img => 
            <Image style={{width: '45%'}}key={img.id} src={process.env.REACT_APP_API_URL + img.name}/>
              )}
          </div>
          <div className='m-4'> 
            {overview.text}
          </div>
        </Card.Text>
        {localStorage.getItem('token')? 
        (<div style={{width: 200}}>
          <Form.Range style={{marginBottom: 10}} min="0" max="5" value={rate} onChange={e => setRate(e.target.value)}/>
          <Button  variant="dark"  onClick={addRate}>Оценить</Button>
        </div>) : 
        (<></>)}
      </Card>
    </Container>
  )
})

export default OverviewPage

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { createRate, fetchOneOverview, createComment } from '../http/oveviewAPI'
import {fetchOneUser} from '../http/userAPI'
import star from "../imgs/star.svg";
import { Card, Container, Image, Form, Button, Carousel, InputGroup, Row, Col, CardGroup } from 'react-bootstrap'

const OverviewPage = observer(() => {
const { t } = useTranslation()
const [overview, setOverview]= useState({img: [], comments: []})
const [user, setUser]= useState({})
const {id} = useParams()
const navigate = useNavigate();

useEffect(() => {
  fetchOneOverview(id).then(data => {
    setOverview(data)
    fetchOneUser(data.userId).then(data => setUser(data))
  })
}, [])

console.log(user)

const [rate, setRate] = useState('0')
const [text, setText] = useState('')

const addRate = () => {
  const formData = new FormData()
  formData.append('rate', rate)
  formData.append('userId', localStorage.getItem('id'))
  formData.append('overviewId', overview.id)
  createRate(formData) 
  window.location.reload()
}

const addComment = () => {
  const formData = new FormData()
  formData.append('text', text)
  formData.append('userId', localStorage.getItem('id'))
  formData.append('overviewId', overview.id)
  createComment(formData) 
  window.location.reload()
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
        <Card.Header style={{fontSize: 26}}>{overview.name}</Card.Header>
        <Card.Body>
          <Row>
            <Col sm={7}>
              <Carousel variant="dark"  interval={null}>
              {overview.img.map(img => 
              <Carousel.Item>
              <img className="d-block w-100 m-auto" key={img.id} src={process.env.REACT_APP_API_URL + img.name}/>
            </Carousel.Item>)}
          </Carousel>
            </Col>
            <Col>
                <h2 style={{cursor: "pointer"}} onClick={() => navigate('/user/' + overview.userId)}>{t('Author')}: {user.name} </h2>
                <div className='d-flex flex-nowrap my-3'> 
                  <h3 style={{alignSelf:'center', margin:0}}> {t(`Author's rating`)} {overview.rating} </h3>
                  <img src={star} style={{width:40, margin:6}}/>
                </div>
                <div className='d-flex flex-nowrap align-items-center mb-4'> 
                {overview.overalRating? (<h3 style={{alignSelf:'center', margin:0}}>{t('Average rating')} { mathOveralRating(overview.overalRating)}</h3>) : (<h3>{t('Rate first')} </h3>)}                  <img src={star} style={{width:40, margin:6}}/>
                </div>
                <div>
                  <h5> {t('Published')}: {new Date(Date.parse(overview.createdAt)).toLocaleString()}</h5>
                </div>
            </Col>
          </Row>
        </Card.Body>
        
        <Card.Title  style={{fontSize: 18, margin: 25}}>
            {overview.text}
        </Card.Title >
        {localStorage.getItem('token')? 
        (<>
        <Form className='w-50 d-flex align-items-center m-4'>
          <div className="d-flex align-items-center m-2">
            <p style={{fontSize: 28, margin:0}}>{rate}</p>
            <img src={star} style={{width:40}}/>
          </div>
          <Form.Range className='w-25' min="0" max="5" value={rate} onChange={e => setRate(e.target.value)}/>
          <Button className='m-2 w-25' variant="dark"  onClick={addRate}>{t('Rate')}</Button>
        </Form>
        <Form className='m-3'>
          <Form.Control as="textarea" rows={3} value={text} onChange={e => setText(e.target.value)}/>
          <Button variant="dark" onClick={addComment}>{t('Comment')}</Button>
        </Form>
          
        </>) : 
        (<></>)}
      </Card>
      <CardGroup className='d-flew flex-column m-4'>
        <h3 >{t('Comments')}</h3>
          {overview.comments.length? (overview.comments.map(comment => 
            <Card className='m-2' key={comment.id}>
              <h4>{comment.text}</h4>
              <h6 style={{textAlign:'end'}}>{new Date(Date.parse(comment.createdAt)).toLocaleString()}</h6>
              </Card>))
            :
            ( <Card> {t('No comments')} </Card>)}
        </CardGroup>
    </Container>
  )
})

export default OverviewPage

import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import {fetchOneUser} from '../http/userAPI'
import star from "../imgs/star.svg";
import {Card, Carousel, Row, Col } from "react-bootstrap";

const OverviewItem = ({overview}) => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [user, setUser]= useState({})

  useEffect(() => {
    fetchOneUser(overview.userId).then(data => setUser(data))
  }, [])
    
  return (
    <Card className='mb-3'>
      <Card.Header style={{fontSize: 20, cursor: "pointer"}} onClick={() => navigate("/overveiw/" + overview.id)}>{overview.name}</Card.Header>
          <Card.Body>
            <Row>
              <Col sm={5}>
                <Carousel variant="dark" interval={null}>
              {overview.img.map(img => 
              <Carousel.Item>
                <img className="d-block w-100 m-auto"  key={img.id} src={process.env.REACT_APP_API_URL + img.name}/>
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
                   {overview.averageRating? (<h3 style={{alignSelf:'center', margin:0}}> {t('Average rating')}  {overview.averageRating}</h3> ): (<h3> {t('Rate first')} </h3>)}
                  <img src={star} style={{width:40, margin:6}}/>
                </div>
                <div>
                  <h5> {t('Published')}: {new Date(Date.parse(overview.createdAt)).toLocaleString()}</h5>
                </div>
              </Col>
            </Row>
          </Card.Body>
    </Card>
  )
}

export default OverviewItem

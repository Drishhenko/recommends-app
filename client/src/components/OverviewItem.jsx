import React from 'react'
import { useNavigate } from "react-router-dom";
import {Card, Image } from "react-bootstrap";
import star from "../imgs/icon-star.png";

const OverviewItem = ({overview}) => {
    const navigate = useNavigate();
    
    const mathOveralRating = (rating) => {
        let ratingsArray = []
        console.log('rating',rating)
        rating.forEach( rate => ratingsArray.push(rate.rate))
        if(ratingsArray.length > 1) {
          return ratingsArray.reduce((a, b) => (a+b))/ratingsArray.length
        } else return ratingsArray[0]
      
    }
  
  return (
    <Card style={{ cursor: "pointer" }} className="p-3 m-2" onClick={() => navigate("/overveiw/" + overview.id)}>
          <Card.Header style={{fontSize: 20}}>{overview.text}</Card.Header>
          <Card.Body className='d-flex justify-content-around'>
          <div className='d-flex align-items-center'> 
            Оценка user {overview.rating}
            <Image src={star} />
          </div>
          <div className='d-flex align-items-center'> 
          {overview.overalRating.length? ('Средняя оценка ' + mathOveralRating(overview.overalRating)) : 'Оцени первым'}      
          <Image src={star} />
          </div>
        </Card.Body>
    </Card>
  )
}

export default OverviewItem

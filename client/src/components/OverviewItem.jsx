import React from 'react'
import { useNavigate } from "react-router-dom";
import {Card, Image } from "react-bootstrap";
import star from "../imgs/icon-star.png";

const OverviewItem = ({overview}) => {
    const navigate = useNavigate();
  
  return (
    <Card style={{ cursor: "pointer" }} className="p-3 m-2" onClick={() => navigate("/overveiw/" + overview.id)}>
          <Card.Header style={{fontSize: 20}}>{overview.text}</Card.Header>
          <Card.Body className='d-flex justify-content-around'>
          <div className='d-flex align-items-center'> 
            Оценка user {overview.rating}
            <Image src={star} />
          </div>
          <div className='d-flex align-items-center'> 
          {overview.averageRating? ('Средняя оценка обзора ' + overview.averageRating) : 'Оцени обзорпервым '}
          <Image src={star} />
          </div>
        </Card.Body>
        <Card.Text >
          <div>
            {overview.img.map(img => 
                <Image style={{ width: '25%', margin: 15}} key={img.id} src={process.env.REACT_APP_API_URL + img.name}/>
            )}
          </div>
          <div className='m-4'>
            {overview.text}
          </div>
        </Card.Text>
    </Card>
  )
}

export default OverviewItem

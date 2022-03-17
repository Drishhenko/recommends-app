import React from 'react'
import { useNavigate } from "react-router-dom";
import {Card, Image } from "react-bootstrap";
import star from "../imgs/icon-star.png";

const OverviewItem = ({overview}) => {
    const navigate = useNavigate();
    

  return (
    <Card style={{ cursor: "pointer" }} className="p-3 m-2" onClick={() => navigate("/overveiw/" + overview.id)}>
          <Card.Header style={{fontSize: 20}}>{overview.text}</Card.Header>
          <Card.Title className="d-flex justify-content-between" style={{width: '17%'}}>
            <div style={{textAlign: 'center'}}>
              <h5>Login</h5>
              <h5 >{overview.rating}</h5>
              <Image src={star} />
            </div>
          </Card.Title>
    </Card>
  )
}

export default OverviewItem

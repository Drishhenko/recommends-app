import React from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchOverviews } from "../http/oveviewAPI";
import star from "../imgs/icon-star.png";
import { Card, Container, Image } from "react-bootstrap";

const OverviewTop = observer(() => {
  const { overview } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOverviews().then(data => overview.setOverviews(data))
  }, [])

  console.log(overview.img)
  return (
    <Container>
      <h1>Топовые обзоры</h1>
      {overview.overviews.map((overview) => (
        <Card
          style={{ cursor: "pointer" }}
          key={overview.id}
          className="p-3 m-2"
          onClick={() => navigate("/overveiw/" + overview.id)}
        >
          <Card.Header style={{fontSize: 20}}>{overview.text}</Card.Header>
          <Card.Title className="d-flex justify-content-between" style={{width: '17%'}}>
            <div>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "gray",
                  borderRadius: "50%",
                }}
              />
              <h5>Login</h5>
            </div>
            <div style={{textAlign: 'center'}}>
              <h5 >{overview.rating}</h5>
              <Image src={star} />
            </div>
          </Card.Title>
          {/* {overview.img.map((img) => 
          <Card.Img
            style={{ width: 200, height: 200 }}
            key={img.id}
            src={process.env.REACT_APP_API_URL + img}
          />
          )} */}
        </Card>
      ))}
    </Container>
  );
});

export default OverviewTop;

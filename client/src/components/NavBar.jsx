import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
  Card,
  Image
} from "react-bootstrap";
import { Context } from "..";


const NavBar = observer(() => {
  const navigate = useNavigate()
  
  const logOut = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    navigate('/')

  }
  
  const userName = localStorage.getItem('name')

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">i</Navbar.Brand>
        <Nav className="w-100 d-flex justify-content-around">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="light">Search</Button>
          </Form>
          {userName? 
          <>
          <Button variant="light" onClick={() => navigate('/create-overview')}> Добавить отзыв </Button>
          <Button variant="light" onClick={() => logOut()}> Выйти </Button> 
          <Button variant="light" href="/user">{userName}</Button>
          </>
        :
          <Button variant="light" href="/login"> Войти </Button>
        }
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;

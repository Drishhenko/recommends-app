import React from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next'
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
  ButtonGroup
} from "react-bootstrap";


const NavBar = observer(() => {
  const { t, i18n } = useTranslation()

  const changeLanguageHandler = (lang) =>
     {
       i18n.changeLanguage(lang)
     }

  const navigate = useNavigate()
  
  const logOut = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    navigate('/')

  }
  
  const userName = localStorage.getItem('name')

  return (
    <Navbar className="mb-3" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">iRecommend</Navbar.Brand>
          <Nav className="w-100 d-flex justify-content-between">
            <Form className="d-flex ">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="light">{t('Search')}</Button>
            </Form>
            {userName? 
              <>
                <Button variant="light" onClick={() => navigate('/create-overview')}>{t('Add review') } </Button>
                <Form className="d-flex flex-nowrap">
                   <Form.Label style={{color:'white', marginRight:8}}>En</Form.Label>
                  <Form.Check type="switch" onChange={e => changeLanguageHandler(e.target.checked ? 'ru' : 'en')}/>
                  <Form.Label style={{color:'white'}}>Ru</Form.Label>
                </Form>
               
                <ButtonGroup>
                  <Button variant="light" 
                    onClick={()=> {
                      if(localStorage.getItem('role')=== 'ADMIN'){
                        navigate('/user/ADMIN')
                      } else navigate('/user/' + localStorage.getItem('id'))}
                    }> {userName}
                  </Button>
                  <Button variant="danger" onClick={() => logOut()}> {t('Go out') } </Button> 
                </ButtonGroup>
              </>
            :
              <Button variant="light" href="/login">{t('Enter') }</Button>
            }
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;

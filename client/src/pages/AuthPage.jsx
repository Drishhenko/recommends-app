import React, { useState, useContext }from "react";
import { useLocation, useNavigate} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next'
import { Context } from "..";
import { login, registration } from "../http/userAPI";
import vk from "../imgs/icon-vk.svg";
import facebook from "../imgs/icon-facebook.svg";
import {Card, Container, Form, FormControl, Button, Image} from "react-bootstrap";

const AuthPage = observer(() => {
  const { t } = useTranslation()
  const {user} = useContext(Context)
  const location = useLocation();
  const navigate = useNavigate()
  const isLogin = location.pathname === "/login";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  
  const clickAuth = async () => {
    try {
      let userData
      if (isLogin) {
        userData = await login(email, password);
      } else {
        userData = await registration(email, password, name);
      }
      console.log(userData)
      user.setUser(user)
      navigate('/')
      } catch (e) {
        alert(e.response.data.message)
      }
    };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card className="w-50 h-50 p-4 d-flex justify-content-between">
        <Form>
          <h4>{t('Login using E-mail and password')}</h4>
          
          {isLogin ? (
            <></>
          ) : (
            <FormControl
            className="mb-2" 
            placeholder="login"
            value={name}
            onChange={e => setName(e.target.value)} 
            />
            )}
          <Form.Control 
            className="mb-2" 
            placeholder="E-mail" 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)} 
          />
          <Form.Control
            placeholder="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} 
          />
          <Form.Group className="d-flex justify-content-around mt-3">
            {isLogin ? (
              <>
                <Button variant="dark" onClick={clickAuth}>{t('Login')}</Button>
                <Button variant="light" href="/registration">                  
                {t('Registration')}
                </Button>
              </>
            ) : (
              <>
                <Button variant="dark" onClick={clickAuth}>{t('Registration')}</Button>
                <Button variant="light" href="/login">
                {t('Login')}
                </Button>
              </>
            )}
          </Form.Group>
        </Form>

        <Form className="d-flex align-items-center mt-4">
          <h4>{t('Login via social network')}</h4>
          <Image style={{ width: 50 }} src={vk} />
          <Image style={{ width: 50 }} src={facebook} />
        </Form>
      </Card>
    </Container>
  );
});

export default AuthPage;

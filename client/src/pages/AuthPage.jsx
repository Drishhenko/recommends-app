import React from "react";
import { observer } from "mobx-react-lite";
import {Card, Container, Form, FormControl, Button, Image} from "react-bootstrap";
import { useLocation, useNavigate} from "react-router-dom";
import vk from "../imgs/icon-vk.svg";
import facebook from "../imgs/icon-facebook.svg";
import { login, registration } from "../http/userAPI";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "..";

const AuthPage = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation();
  const navigate = useNavigate()
  const isLogin = location.pathname === "/login";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  
  const clickAuth = async () => {
    try {
      let userAuth
      if (isLogin) {
        userAuth = await login(email, password);
      } else {
        userAuth = await registration(email, password, name);
      }
      
      user.setUser(user)
      user.setIsAuth(true)
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
      <Card className="w-50 h-50 p-5 d-flex justify-content-between">
        <Form>
          <h4>Войти используя E-mail и пароль</h4>
          
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
                <Button variant="dark" onClick={clickAuth}>Войти</Button>
                <Button variant="light" href="/registration">                  
                  Регистрация
                </Button>
              </>
            ) : (
              <>
                <Button variant="dark" onClick={clickAuth}>Регистрация</Button>
                <Button variant="light" href="/login">
                  Войти
                </Button>
              </>
            )}
          </Form.Group>
        </Form>

        <Form className="d-flex align-items-center mt-4">
          <h4>Войти через социальную сеть</h4>
          <Image style={{ width: 50 }} src={vk} />
          <Image style={{ width: 50 }} src={facebook} />
        </Form>
      </Card>
    </Container>
  );
});

export default AuthPage;

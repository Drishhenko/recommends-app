import React, {useState, useEffect } from 'react'
import { useNavigate} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from 'react-i18next'
import { login} from "../http/userAPI";
import {fetchUsers} from '../http/userAPI'
import { Card, Container, Button} from 'react-bootstrap'

const AdminPage = observer(() => {
  const { t } = useTranslation()

    const [users, setUsers]= useState({})
    const navigate = useNavigate()
    useEffect(() => {
        fetchUsers().then(data => setUsers(data))
      }, [])

    const clickLogin = async (email, password) => {
        let admin = true
        await login(email, password, admin)
        navigate('/')
    }

   console.log('users', users) 
  return (
     <Container>
        <Card>
            <Card.Header>
                <h1>
                {t('Admin')}  
                </h1>
            </Card.Header>
            {users.length ? (users.map( i => 
                <Card.Body key={i.id} >
                   <Button variant="dark" className ='d-flex align-items-center' onClick={ () => clickLogin(i.email, i.password)}>
                   {t('Login as')}  {i.name}  
                    </Button>
                </Card.Body>)
            ) : (<Card.Body> {t('There is not anyone')}</Card.Body>)}
            {}
        </Card>
     </Container>
  )
})

export default AdminPage

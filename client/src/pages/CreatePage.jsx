import React from "react";
import { useContext, useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Context } from "..";
import TypeBar from "../components/TypeBar";
import { Button, Container, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { createOverview, fetchTypes} from "../http/oveviewAPI";
import star from "../imgs/star.svg";

const CreateOverview = observer(() => {
  const { t } = useTranslation()
  const {overview} = useContext(Context)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState('0')
  const [files, setFiles] = useState(undefined)
  const navigate = useNavigate()


  useEffect(() => {
    fetchTypes().then(data => overview.setTypes(data))
  }, [])

  // const handleTypeBarClick = (id) => {
  //   setTypeId(id)
  // }

  const selectFiles = e => {
    setFiles( e.target.files)
  } 
  

  const addOverview = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('text', text)
    for(let i=0; i<files.length; i++){
      formData.append('img[]', files[i])
    }
    formData.append('userId', localStorage.getItem('id'))
    formData.append('typeId', overview.selectedType.id)
    formData.append('rating', rating)
    createOverview(formData)
    navigate('/')
  }
    
  return (
    <Container>
      <h2>{t('Add review')}</h2>
      <Form.Label className="mt-4"> {t('Select type')}</Form.Label>
        <TypeBar/>
      <Form className="mt-4">
        <Form.Group>
          <Form.Label>{t('Review title')}</Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-2"> {t('Review text')} </Form.Label>
          <Form.Control as="textarea" rows={7} value={text} onChange={e => setText(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label> {t('Add image')}</Form.Label>
          <Form.Control type="file" multiple onChange={selectFiles}/>
        </Form.Group>
      <Form className="d-flex align-items-center justify-content-between m-4">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center ">
            <p style={{fontSize: 28, margin:0}}>{rating}</p>
            <img src={star} style={{width:40}}/>
          </div>
          <Form.Range style={{width:200, marginLeft:10}} min="0" max="5" value={rating} onChange={e => setRating(e.target.value)} />
        </div>
        <Button variant="dark" size="lg" onClick={addOverview}>
        {t('Post review')}
        </Button>
      </Form>
      </Form>
    </Container>
  );
});

export default CreateOverview;

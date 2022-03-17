import React from "react";
import { useContext, useState, useEffect} from "react";
import { Context } from "..";
import TypeBar from "../components/TypeBar";
import Rating from "../components/Rating";
import { Button, Container, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { createOverview, fetchTypes} from "../http/oveviewAPI";

const CreateOverview = observer(() => {
  const {overview} = useContext(Context)
  const [typeId, setTypeId] = useState(null)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(undefined)
  const [files, setFiles] = useState(undefined)
  const userId = localStorage.getItem('id')

  useEffect(() => {
    fetchTypes().then(data => overview.setTypes(data))
  }, [])

  const handleTypeBarClick = (id) => {
    setTypeId(id)
  }

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
    formData.append('userId', userId)
    formData.append('typeId', typeId)
    formData.append('rating', rating)
    createOverview(formData)
  }
  
  return (
    <Container>
      <h2>Добавить обзор</h2>
      <Form.Label className="mt-4"> Выберите тип </Form.Label>
        <TypeBar handleTypeBarClick={handleTypeBarClick}/>
      <Form className="mt-4">
        <Form.Group>
          <Form.Label> Название обзора </Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label className="mt-2"> Текст обзора </Form.Label>
          <Form.Control as="textarea" rows={7} value={text} onChange={e => setText(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label> Добавьте изобажение </Form.Label>
          <Form.Control type="file" multiple onChange={selectFiles}/>
        </Form.Group>
      <Form.Group className="d-flex align-items-center justify-content-between mt-4">
        <Button variant="dark" size="lg" onClick={addOverview}>
          Опубликовать обзор
        </Button>
        <Form.Range style={{width:200}} min="0" max="5" value={rating} onChange={e => setRating(e.target.value)} />
      </Form.Group>
      </Form>
    </Container>
  );
});

export default CreateOverview;

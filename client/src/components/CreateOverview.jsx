import React from "react";
import { useContext, useState} from "react";
import { Context } from "..";
import TypeBar from "./TypeBar";
import Rating from "./Rating";
import { Button, Container, Form } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { createOverview } from "../http/oveviewAPI";

const CreateOverview = observer(() => {
  const {overview} = useContext(Context)
  const [typeId, setTypeId] = useState(null)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(undefined)
  const [files, setFiles] = useState(undefined)
  const userId = localStorage.getItem('id')

  const handleTypeBarClick = (id) => {
    setTypeId(id)
  }

  const selectFiles = e => {
    setFiles(e.target.files)
  } 
  // const fileToDataUri = (image) => {
  //   return new Promise((res) => {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => {
  //         res(reader.result)
  //     });
  //     reader.readAsDataURL(image);
  //   })
  // }
  
  // const selectFiles = async (e) => { 
  //   let newImagesPromises = []
  //   for (let i = 0; i< e.target.files.length; i++) {
  //     newImagesPromises.push(fileToDataUri(e.target.files[i]))
  //   }
  //   const newImages = await Promise.all(newImagesPromises)
  //   setFiles(newImages)
  // }
  

  console.log('files',files)

  const addOverview = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('text', text)
    formData.append('img', files)
    formData.append('userId', userId)
    formData.append('typeId', typeId)
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

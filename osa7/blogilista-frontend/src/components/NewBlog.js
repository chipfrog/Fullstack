import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Row, Col } from 'react-bootstrap'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.createBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group as={Row} controlId='formAuthor'>
          <Col sm='2'>
            <Form.Label>author</Form.Label>
          </Col>
          <Col sm='8'>
            <Form.Control type='text' value={author}
              onChange={({ target }) => setAuthor(target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formTitle'>
          <Col sm='2'>
            <Form.Label>title</Form.Label>
          </Col>
          <Col sm='8'>
            <Form.Control type='text' value={title}
              onChange={({ target }) => setTitle(target.value)}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId='formUrl'>
          <Col sm='2'>
            <Form.Label>url</Form.Label>
          </Col>
          <Col sm='8'>
            <Form.Control type='text' value={url}
              onChange={({ target }) => setUrl(target.value)}/>
          </Col>
        </Form.Group>
        <Button type='submit' id="create">create</Button>
      </Form>
    </div>
  )
}

export default NewBlog
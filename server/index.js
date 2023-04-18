
const express = require('express')
const app = express()
app.use(express.json())

// Json de ejemplo
let notes = [
  {
    id: 1,
    content: 'Me tengo que subscribir a @midudev en Youtube',
    date: '2019-05--30T17:30:31.098Z',
    importante: true
  },
  {
    id: 2,
    content: 'Tengo que estudiar las clases del FullStack Bootcamp',
    date: '2019-05--30T17:30:31.098Z',
    importante: false
  },
  {
    id: 3,
    content: 'Repasar los retos de JS de miduev',
    date: '2019-05--30T17:30:31.098Z',
    importante: true
  }
]

app.get('/', (request, response) => {
  response.send('<h2>Hello word<h2/>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  // Hay que tener en cuenta que toda la request esta en formato de texto
  const note = notes.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  // 204 -> no contenido
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body
  // Tenemos que crear la nueva nota //
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes = [...notes, newNote]
  // 201 -> lo que tendria que devolver un post cuando hay salido todo bien
  response.status(201).json(newNote)
})

// Puerto de nuestro servidor //
const PORT = 5173

// Al iniciarse el servidor con express hay una pequena asincronia entonces mejor ponerlo con un callback
app.listen(PORT, () => {
  console.log('server running')
})

// En esta carpeta estaran todas las funciones que seran

// reutilizadas //
const getUsers = (request, response) => {
  const prueba = [
    {
      libro: 'Libro1',
      estadoLibro: 'Seminuevo'
    },
    {
      libro: 'Libro2',
      estadoLibro: 'Nuevo'
    },
    {
      libro: 'Libro3',
      estadoLibro: 'Viejo'
    }
  ]
  response.json(prueba)
}

const createUser = async (request, response) => {
  response.send('Creando un usuario')
}

const updateUser = (request, response) => {
  response.send('Actualizando un usuario')
}

const deleteUser = (request, response) => {
  response.send('Eliminando un usuario')
}
const functions = [getUsers, createUser, updateUser, deleteUser]

module.exports = functions

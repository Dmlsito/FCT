const express = require('express')

const app = express()
app.get('/', (request, response) => {
    response.sendFile('./public/index.html', {
        root: __dirname
    })
})

app.listen(3000)
console.log(`Server on port ${3000}`)
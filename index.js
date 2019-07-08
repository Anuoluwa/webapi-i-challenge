// implement your API here
const express = require('express');
const User = require('./data/db');
const server = express();

server.use(express.json());


server.get('/api/users', (req, res) => {
    User.find()
     .then(data => {
        if(data.length === 0 ) {
            res.status(404).json({ message: 'users not found' })
        }
         res.status(200).json(data);
     })
     .catch(error => {
         res.status(500).json({ error: "The users information could not be retrieved." });
     })
})

server.get('/api/users/:id', (req, res) => {
    console.log('cjdhcdjv');
})

server.post('/api/users', (req, res) => {
    console.log('cjdh');
})


server.put('/api/users', (req, res) => {
    console.log('cjdhcdjv');
})

server.delete('/api/users', (req, res) => {
    console.log('cjdhcdjv');
})


server.listen(3000, () => {
    console.log('Server listening on 5000')
});
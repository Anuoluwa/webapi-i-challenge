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
    const { id } =req.params;
    User.findById(Number(id))
    .then(data => {
       if(Object.keys(data).length === 0 ) {
           return res.status(404).json({ message: 'users  id not found' })
       }
        res.status(200).json(data);
    })
    .catch(error => {
        return res.status(500).json({ error: "The users information could not be retrieved." });
    })
})

server.post('/api/users', (req, res) => {
    const {name, bio } =req.body;
    const user = {
        name, bio
    }
    if(typeof user.name === 'undefined' || typeof user.bio === 'undefined' ) {
        return res.status(404).json({ errorMessage: "Please provide name and bio for the new user." })
    }
    User.insert(user)

    .then(data => {
         return res.status(201).json({ message: 'user  created successfully', data: user } );
     })
     .catch(error => {
         return res.status(500).json({ error: "The users information could not be created." });
     })
})


server.put('/api/users/:id', (req, res) => {
    const { id } =req.params;
    const {name, bio } =req.body;
    const user = {
        name, bio
    }
    User.update(Number(id), user )
    .then(data => {
        res.status(200).json({ message: 'user updated successfully', data: user });
    })
    .catch(error => {
        return res.status(500).json({ error: "The users information could not be retrieved." });
    })
})

server.delete('/api/users/:id', (req, res) => {
    const { id } =req.params;
    User.remove(Number(id))
    .then(data => {
        if(!data) {
            return res.status(404).json({ message: `The user with the ${id} does not exist.`});
        }
        res.status(200).json({ message: `The user with the ${id} has been removed`});
    })
    .catch(error => {
        return res.status(500).json({ error: "The user could not be removed" });
    })
})


server.listen(3000, () => {
    console.log('Server listening on 3000')
});
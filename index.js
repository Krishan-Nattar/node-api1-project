// implement your API here

console.log("running!");

const express = require('express');
const db = require('./data/db.js');
const server = express();
const port = 8000;

server.use(express.json());


server.get('/api/users', (req, res)=>{
    db.find().then(users=>{
        res.status(200).json(users);
    })
    .catch(err=>{
        res.status(500);
    })
});

server.get('/api/users/:id', (req, res)=>{
    db.findById(req.params.id).then(user=>{
        res.status(200).json(user);
    })
    .catch(err=>{
        res.status(500);
    })
});

server.post('/api/users', (req, res)=>{
    const userInfo = req.body;

    db.insert(userInfo).then(userId=>{
        res.status(201).json(userId);
    })
    .catch(err=>{
        res.status(500);
    })
})

server.delete('/api/users/:id', (req, res)=>{
    const id = req.params.id;

    db.remove(id).then(number=>{
        res.status(200).send("Records Delete: " + number);
    })
    .catch(err=>{
        res.status(500);
    })
})

server.put('/api/users/:id', (req, res)=>{
    db.update(req.params.id, req.body).then(newUser=>{
        res.status(200).json(newUser);
    })
    .catch(err=>{
        res.status(500);
    })
})

server.listen(port, ()=>{
    console.log(`API ON PORT: ${port}`);
})
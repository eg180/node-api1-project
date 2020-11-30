const express = require('express')
const shortid = require('shortid')


const server = express()

// configure the server (PLUG FUNCTIONALITY)
server.use(express.json()) // add the ability to read the body of the req as JSON


// fake users tables

let users = [
    {
        id: shortid.generate(),
        name: "Erick Gonzalez",
        bio: "I love French, coding, my family, and my future wife."
    }
]

// helper functions to interact with our fake users table.

const Users = {
    getAll() {
        return users
    },

    getById(id) {
        return users.find(user => user.id === id)
    },

    createNew(user) {
        const newUser = {
            id: shortid.generate(),
            ...user
        }
        users.push(newUser)
        return newUser
    },

    delete(id) {
        const user = users.find(user => user.id === id)

        if (user) {
            users = users.filter(u => u.id === id)
        } // the above returns null if nothing found.
    },

}



// endpoints

server.get('/api/users', (req, res) => {

    const users = Users.getAll()

    res.status(200).json(users)
})

///////

server.get('/api/users/:id', (req, res) => {

    const { id } = req.params

    const user = User.getById(id)

    if (user) {
       res.status(200).json(user) 
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

server.post('/api/users', (req, res) => {

    const userFromClient = req.body

    if (!userFromClient.bio || !userFromClient.name) {
        res.status(400).json({ message: 'Please provide name and bio for the user.' })
    } else {
        const newlyCreatedUser = Users.createNew(userFromClient)
        res.status(201).json(newlyCreatedUser)
    }
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params

    const deletedUser = User.delete(id)

    if (deletedUser) {
        res.status(200).json(deletedUser)
    } else {
        res.status(404).json({ message: "No user found with that ID"})
    }
})






// catch-all endpoint

server.use('*', (req,res) => {
    res.status(404).json({ message: "This is an invalid URL" })
})

// start the server
server.listen(5000, () => {
    console.log("listening on port 5000")
})
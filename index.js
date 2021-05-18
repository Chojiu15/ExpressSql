const express = require('express')
const app = express()
const port = 3002
const connection = require('./conf')

app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})

app.get('/api/users', (req, res) => {
    connection.query(`SELECT * FROM users`, (err, results) => {
        if(err) throw err
        res.json(results)
    })
})

app.get('/api/users/:id', (req, res) => {
    let {id} = req.params
    connection.query(`SELECT * FROM users WHERE id = ?`, [id] , (err, results) => {
        if(err) throw err
        res.json(results)
    })
})


app.post('/api/users', (req, res) => {
    const {first_name, last_name, age} = req.body
    connection.query(`INSERT INTO users (first_name, last_name, age) VALUES('${first_name}', '${last_name}', '${age}')`, (err, results) => {
        if(err) throw err
        res.json(results)
    } )
})

app.post('/api/users', (req, res) => {
    const formData = req.body
    connection.query(`INSERT INTO users SET ?` , [formData], (err, results) => {
        if(err) throw err
        res.json(results)
    } )
})

app.put('/api/users/:id', (req, res) => {
    let {id} = req.params
    const {first_name, last_name, age} = req.body
    connection.query(`UPDATE users SET first_name='${req.body.first_name}', last_name='${last_name}', age='${age}'  WHERE ID = ${id}`, (err, results) => {
        if(err) throw err
        res.json(results)
    } )
})

// app.put('/api/users/:id', (req, res) => {
//     let {id} = req.params
//     const {first_name, last_name, age} = req.body
//     connection.query(`UPDATE users SET first_name='?', last_name='?', age='?'  WHERE ID = ?`, [first_name, last_name, age, id], (err, results) => {
//         if(err) throw err
//         res.json(results)
//     })
// })

// app.put('/api/users/:id', (req, res) => {
//     let {id} = req.params
//     const formData = req.body
//     connection.query(`UPDATE users SET ?  WHERE ID = ?`, [formData, id], (err, results) => {
//         if(err) throw err
//         res.json(results)
//     })
// })


app.delete('/api/users/:id', (req, res) => {
    let {id} = req.params
    connection.query(`DELETE FROM users WHERE ID = ?`, Number(id), (err, results) => {
        if(err) throw err
        res.send('User deleted')
    })
})








app.listen(port, console.log(`Server is listening on port ${port}`))
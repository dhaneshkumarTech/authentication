const express = require('express')

const app = express() // the main app
const admin = express() // the sub app

admin.get('/', (req, res) => {
    console.log(admin.mountpath) // /admin
    res.send('Admin Homepage')
})

app.use('/admin', admin)


app.listen(3000);
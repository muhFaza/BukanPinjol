const express = require('express')
const session = require('express-session');
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//npm i express-session
app.use(session({
    secret: 'rahasia bukan pinjol',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        samSite: true
    }
}))


app.use('/', require('./routes/index'))

app.listen(port, () => console.log('Running in port ' + port))
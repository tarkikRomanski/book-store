const express = require('express')
const bodyParser = require('body-parser')
const {
    initUsersRoutes,
    initProductRoutes,
} = require("./routes")
const getLanguageMiddleware = require('./middlewares/get-language.middleware')

const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(getLanguageMiddleware)

initUsersRoutes(app)
initProductRoutes(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

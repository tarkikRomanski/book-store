const express = require('express')
const bodyParser = require('body-parser')
const { initUsersRoutes } = require("./routes")
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

initUsersRoutes(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

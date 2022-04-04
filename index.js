const express = require('express')
const bodyParser = require('body-parser')
const {
    initUsersRoutes,
    initProductRoutes,
} = require("./routes")
const getLanguageMiddleware = require('./middlewares/get-language.middleware')
const { sequelize } = require('./database')
const { v4: uuid4 } = require('uuid');

const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(getLanguageMiddleware)

initUsersRoutes(app)
initProductRoutes(app)

app.post('/post', async (req, res) => {
    const {
        title,
        description
    } = req.body

    const postId = uuid4()

    await sequelize.query(
        'INSERT INTO posts (id, title, description) VALUES (:id, :title, :description)',
        {
            replacements: {
                id: postId,
                title,
                description
            }
        }
    )

    await sequelize.query(
        'INSERT INTO posts_snapshots (id, post_id, title, description) VALUES (:id, :postId, :title, :description)',
        {
            replacements: {
                id: uuid4(),
                postId,
                title,
                description
            }
        }
    )

    res.json({
        status: 'done'
    })
})

app.put('/post/:id', async (req, res) => {
    const {
        title,
        description
    } = req.body

    const { id: postId } = req.params

    await sequelize.query(
        'UPDATE store.posts SET description = :description, title = :title WHERE id = :id',
        {
            replacements: {
                id: postId,
                title,
                description
            }
        }
    )

    await sequelize.query(
        'INSERT INTO posts_snapshots (id, post_id, title, description) VALUES (:id, :postId, :title, :description)',
        {
            replacements: {
                id: uuid4(),
                postId,
                title,
                description
            }
        }
    )

    res.json({
        status: 'done'
    })
})

app.put('/post/:id/revert', async (req, res) => {
    const { id: postId } = req.params

    const results = sequelize.query(
        'SELECT description, title FROM posts_snapshot WHERE post_id = :postId ORDER BY created_at desc LIMIT 2',
        {
            replacements: {
                postId
            }
        }
    )

    const [latestVersion, targetVersion] = results

    await sequelize.query(
        'UPDATE posts SET description = :description, title = :title WHERE id = :id',
        {
            replacements: {
                id: postId,
                title: targetVersion.title,
                description: targetVersion.description
            }
        }
    )

    await sequelize.query(
        'DELETE FROM posts_snapshots WHERE id = :id',
        {
            replacements: {
                id: latestVersion.id
            }
        }
    )

    res.json({
        status: 'done'
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

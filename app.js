const express = require('express')
const bodyParser = require('body-parser')
const {
    initUsersRoutes,
    initProductRoutes,
} = require("./routes")
const getLanguageMiddleware = require('./middlewares/get-language.middleware')
const { sequelize } = require('./database')
const { v4: uuid4 } = require('uuid');
const {create} = require("./services/translate.service");

const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(getLanguageMiddleware)

initUsersRoutes(app)
initProductRoutes(app)

app.post('/posts', async (req, res) => {
    const {
        title,
        description
    } = req.body

    const postId = uuid4()

    await sequelize.query(
        'INSERT INTO store.posts (id, title, description) VALUES (:id, :title, :description)',
        {
            replacements: {
                id: postId,
                title,
                description
            }
        }
    )

    await sequelize.query(
        'INSERT INTO store.posts_snapshots (id, post_id, title, description) VALUES (:id, :postId, :title, :description)',
        {
            replacements: {
                id: uuid4(),
                postId,
                title,
                description
            }
        }
    )

    res.redirect(`/posts/${postId}`)
})

app.post('/posts/:id', async (req, res) => {
    const {
        title,
        description
    } = req.body

    console.log(req.body)

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
        'INSERT INTO store.posts_snapshots (id, post_id, title, description) VALUES (:id, :postId, :title, :description)',
        {
            replacements: {
                id: uuid4(),
                postId,
                title,
                description
            }
        }
    )

    res.redirect(`/posts/${postId}`)
})

app.get('/posts/:id/revert', async (req, res) => {
    const { id: postId } = req.params

    const [ results ] = await sequelize.query(
        'SELECT id, description, title FROM store.posts_snapshots WHERE post_id = :postId ORDER BY created_at desc LIMIT 2',
        {
            replacements: {
                postId
            }
        }
    )

    if (results.length < 2) {
        res.redirect(`/posts/${postId}`)

        return
    }

    const [latestVersion, targetVersion] = results

    await sequelize.query(
        'UPDATE store.posts SET description = :description, title = :title WHERE id = :id',
        {
            replacements: {
                id: postId,
                title: targetVersion.title,
                description: targetVersion.description
            }
        }
    )

    await sequelize.query(
        'DELETE FROM store.posts_snapshots WHERE id = :id',
        {
            replacements: {
                id: latestVersion.id
            }
        }
    )

    res.redirect(`/posts/${postId}`)
})

app.get('/posts/revert/:id', async (req, res) => {
    const { id: snapshotId } = req.params

    const [[ targetVersion ]] = await sequelize.query(
        'SELECT * FROM store.posts_snapshots WHERE id = :snapshotId ORDER BY created_at desc LIMIT 1',
        {
            replacements: {
                snapshotId
            }
        }
    )

    await sequelize.query(
        'UPDATE store.posts SET description = :description, title = :title WHERE id = :id',
        {
            replacements: {
                id: targetVersion.post_id,
                title: targetVersion.title,
                description: targetVersion.description
            }
        }
    )

    await sequelize.query(
        'DELETE FROM store.posts_snapshots WHERE created_at > :created AND id != :id AND post_id = :post_id',
        {
            replacements: {
                id: targetVersion.id,
                post_id: targetVersion.post_id,
                created: targetVersion.created_at
            }
        }
    )

    res.redirect(`/posts/${targetVersion.post_id}`)
})

app.get('/posts', async (req, res) => {
    const [posts] = await sequelize.query('SELECT * FROM store.posts')

    console.log(posts)

    res.render('posts/list', { posts })
})

app.get('/posts/create', async (req, res) => {
    res.render('posts/create')
})

app.get('/posts/edit/:id', async (req, res) => {
    const { id } = req.params

    const [[ post ]] = await sequelize.query(
        'SELECT * FROM store.posts WHERE id = :id LIMIT 1',
        {
            replacements: {
                id
            }
        }
    )

    res.render('posts/edit', { post })
})

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params

    const [[ post ]] = await sequelize.query(
        'SELECT * FROM store.posts WHERE id = :id LIMIT 1',
        {
            replacements: {
                id
            }
        }
    )

    const [ snapshots ] = await sequelize.query(
        'SELECT * FROM store.posts_snapshots WHERE post_id = :id',
        {
            replacements: {
                id
            }
        }
    )

    res.render('posts/item', { post, snapshots })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = {
    app,
}

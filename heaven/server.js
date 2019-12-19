const next = require('next')
const express = require('express')
const axios = require('axios')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.get('/', (req, res) => {
        if(req.cookie && req.cookie.token)
            return res.redirect('/profile')
        return app.render(req, res, '/index', req.query)
    })

    server.get('/profile', (req, res) => {
        if(req.cookie && req.cookie.token)
            return app.render(req, res, '/profileMember', req.query)
        return res.redirect('/')
    })

    server.get('/problems', (req, res) => {
        return app.render(req, res, '/problems', req.query)
    })

    server.get('/problem/:id', (req, res) => {
        return app.render(req, res, `/problem/${req.params.id}`, req.query)
    })

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})


const next = require('next')
const express = require('express')
const axios = require('axios')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const key = ""
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const admins = ['']

app.prepare().then(() => {
    const server = express()

    server.use(cookieParser());

    server.get('/', (req, res) => {
        if(req.cookies && req.cookies.token)
            return res.redirect('/profile')
        return app.render(req, res, '/index', req.query)
    })

    server.get('/profile', (req, res) => {
        if(req.cookies && req.cookies.token)
            return app.render(req, res, '/profile', req.query)
        return res.redirect('/')
    })

    server.get('/problems', (req, res) => {
        return app.render(req, res, '/problems', req.query)
    })

    server.get('/problem/:id', (req, res) => {
        return app.render(req, res, `/problem/${req.params.id}`, req.query)
    })

    server.get('/upload', (req, res) => {
        return app.render(req, res, '/upload', req.query)
    })

    server.get('/submission/:id', (req, res) => {
        if(req.cookies && req.cookies.token)
            return app.render(req, res, '/submission', req.query) 
        return app.render(req, res, '/profile', req.query)
    })

    server.get('/admin', (req, res) => {
        if(req.cookies && req.cookies.token){
            const decodedData = jwt.decode(req.cookies.token, {complete: true})
            const admin = decodedData.payload.email || decodedData.payload.Email
            console.log(admin);
            if (admins.includes(admin))
                return app.render(req, res, '/admin', req.query)
        }
        return res.redirect('/404')
    })

    server.get('/review', (req, res) => {
        if(req.cookies && req.cookies.token){
            const decodedData = jwt.decode(req.cookies.token, {complete: true})
            const admin = decodedData.payload.email || decodedData.payload.Email
            console.log(admin);
            if (admins.includes(admin))
                return app.render(req, res, '/review', req.query)
        }
        return res.redirect('/404')
    })

    server.get('/review/:name', (req, res) => {
        if(req.cookies && req.cookies.token){
            const decodedData = jwt.decode(req.cookies.token, {complete: true})
            const admin = decodedData.payload.email || decodedData.payload.Email
            console.log(admin);
            if (admins.includes(admin))
                return app.render(req, res, `/review/${req.params.name}`, req.query)
        }
        return res.redirect('/404')
    })

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})

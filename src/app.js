const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')
const path = require('path')

const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 8000


//Define path for express 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: ' Akarsh Saxena'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        para: 'This is help',
        name: ' Akarsh Saxena'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: ' Akarsh Saxena'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an Address'
        })
    }
    geocode(req.query.address, (error, { location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(req.query.address, (error, forecastdata) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location: location,
                forecast: forecastdata
            })



        })
    })

})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []

    })
})
app.get('/help/*', (req, res) => {
    res.render('notfound', {
        error: 'Help article not found',
        title: '404',
        name: ' Akarsh Saxena'
    })
})


app.get('*', (req, res) => {
    res.render('notfound', {
        error: 'Help article not found',
        title: '404',
        name: ' Akarsh Saxena'
    })
})
app.listen(port, () => {
    console.log('Running on port' + port + "...")
})
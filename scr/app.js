const geoCode = require('./Utils/geocode')
const getWeather = require('./Utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Set directory routes for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory 
app.use(express.static(publicDirectoryPath))

//Set handlebars engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Station',
        name: 'Siddharth Bet'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Siddharth Bet'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'May I help you',
        name: 'Siddharth Bet',
        helpText: 'You will find all the help here'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide an address'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({ error })
        }    
        else {
            getWeather(latitude, longitude, (error, forecast) => {
             
                if (error) {
                    res.send( { error })
                }
                else {
                    res.send({
                        forecast,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
}) 

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Siddharth Bet',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Siddharth Bet',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Lihu Zur'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Lihu Zur'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        msg: 'Help message',
        title: 'Help',
        name: 'Lihu Zur'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,//same as location: location
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 404,
        name: "Lihu Zur",
        errorMsg: "help article not found"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 404,
        name: "Lihu Zur",
        errorMsg: "page not found"
    })
})

//app.com
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
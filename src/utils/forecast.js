const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=330e04b2e46092951e3a496faada644f&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error,{body}) => {
        if(error){
            callback('unable to connect to weather service',undefined)
        }
        else if(body.error) {
            callback('unable to find location', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out. The humidity is " + body.current.humidity + "%.")
        }
})
}

module.exports = forecast
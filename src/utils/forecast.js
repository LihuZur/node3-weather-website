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
            callback(undefined, "it is currently " + body.current.temperature + " degrees outside")
        }
})
}

module.exports = forecast
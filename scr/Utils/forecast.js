const request =  require('request')

const getWeather = (latitude, longitude, callback) => {
    const weatherURL = 'http://api.weatherstack.com/current?access_key=31f499020cee87973cc6c36c910b63b0&query=' + longitude + ',' + latitude

    request( {url: weatherURL, json: true }, (error, response) => {
        if (error) {
            callback('Cannot access weather service', undefined)
        } else if (response.body.error) {
            callback('Cannot fetch the weather information', undefined)
        } else {
            const forecast = 'It is currently '+ response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees.'
            callback(undefined, forecast)
        }
    })
}

module.exports = getWeather
const request = require('request')

const geoCode = (address,callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2lkZGhhcnRoYmV0IiwiYSI6ImNrZjN5YWduYjA3dGoyeHFleTI4b3I5eWwifQ.mmSN9Ze6uD171WZZcqd6mQ'

    request( {url: geoURL, json: true}, (error, response) => {
        if (error) {
            callback('Cannot access location service', undefined)
        } else if (response.body.features.length === 0) {
            callback('Cannot find the location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }

    } )
}

module.exports = geoCode
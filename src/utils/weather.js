const request = require('request')

const weather = (longitude, latitude, callback) => {
  let url = 'http://api.weatherstack.com/current?access_key=6d10a3e6d4dcf2b5edfff16bc873128c&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) + '&units=f'
  request({ url, json: true }, (error, {body}={}) => {
    if (error) {
      callback('Unable to get any data , check your sevices' , undefined)
    }
    else if (body.error) {
      callback(body.error.info , undefined)
    }
    else {
      callback(null, {
        temperature: body.current.temperature,
        feelslike:body.current.feelslike,
        description: body.current.weather_descriptions[0],
        observationTime : body.current.observation_time
      })
    }
  })

}
module.exports = weather
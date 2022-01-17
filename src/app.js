const path = require("path");
const express = require("express");
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const weather = require('./utils/weather')

const app = express();
const port = process.env.PORT || 3000;
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

//set up handlebars for views location
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'));

const partialpath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialpath) 

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Maha'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: "Maha"

  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "help",
    name: "maha",
  })
})
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
     error : 'Please provide the address'
   })
  }
  geocode(req.query.address, (error, { longitude, latitude, placeName } = {}) => {
    if (error) {
      return res.send({
       error
     })
   }
    weather(longitude, latitude, (error, { temperature, feelslike, description }) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send ( {
        forecast: temperature,
        address: placeName,
        feelslike,
        description
      })
    })
    
 })
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
   return res.send({
      error: 'you must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products : []
  })
})

app.get("/help/*", (req, res) => {
  res.render('generic', {
    name: "maha",
    title: "My 404 Page",
    msg: "Page Not Found"
  })
});

app.get("*", (req, res) => {
  res.render('generic', {
    name: "maha",
    title: "My 404 Page",
    msg: "Page Not Found"
  })
});


app.listen(port, () => {
  console.log("listening at port ..." , port);
});

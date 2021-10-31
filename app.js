const express =  require('express');
const hbs = require('hbs')
const path = require('path')
const forecast = require('./forecast');
const geocode = require('./geocode');

const app =  express();
const port =  process.env.PORT || 3000
//path for express config
const publicDir = path.join(__dirname, './public');
const viewPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

//Avec le template hbs de handlebars
// ça devient un peu comme en flutter avec une seule classe
// tu peux personaliser plusieurs vues d'ou du dynamic
//c.a.d on evite de creer une page à chaque fois
//setup handlebars engine 
app.set('view engine', 'hbs')
// custom dir : you can change views by templates
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
//setup static dir
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
      title: "Weather App",
      name: 'Aristide NHOLLE',
      author: "Powered By AriNTeck"
    })
})

app.get('/about', (req, res) =>{
  res.render('about', {
    title: "About Me",
    name: 'AriNTeck',
    author: "Powered By AriNTeck"
  })
})

app.get('/help', (req, res) =>{
  res.render('help', {
    title: "Help",
    helpText: 'For any questions'
  })
})

//to handle other page
app.get('/help/*', (req, res) =>{
  res.render('404', {
    author: "Powered By AriNTeck",
    errorMessage:'Help article not found'
  })
})


app.get('/weather', (req, res) =>{
  
/*   if(!req.query.address){
    return res.send({"error" : "Nothing passed"})
  } */
  return  geocode(req.query.address, (er, resut) => {
      if(er){
        return res.send(er)
      }
      forecast(resut, (er, result) =>{
        if(er){        
          return res.send(er)
        }
        
        res.send({
          forecast : `${result.temperature}°C`,
          location : result.location,
          address : req.query.address
        })
      })
    })
})


app.get('*', (req, res) => {
  res.render('404', {
    author: "Powered By AriNTeck",
    errorMessage:'Page not found'
  })
})

//create server

app.listen(port, () =>{
    console.log('Server started' +port);
})
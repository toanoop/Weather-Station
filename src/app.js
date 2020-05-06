const path = require("path")
const express = require("express")
const hbs = require("hbs")
//const geocode = require('../../weather-app/utils/geolocation.js')
const geocode = require('../src/utils/geolocation.js')
//const forecast = require('../../weather-app/utils/forecast.js')
const forecast = require('../src/utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000
//Define paths for Exprss config
const pathtopublic = path.join(__dirname, '../public')
//const viewspath = path.join(__dirname, '../templates') -- is not working!!!!
//this is all it takes to get started hbs templating engine
//Setup handlebars engine and Views location
app.set('view engine','hbs')
app.set('views',path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))
//Express will now look for all the Statis assests in the Folder pointed to by Pathtopublic which is public
app.use(express.static(pathtopublic))

//to get the Handlebars dynamic page we need a route
app.get('',(req,res) => {

    res.render('index',{
               message1: 'We are Here',
               message2: 'So that your Next Conversation is not about Weather!'
              //title: 'We have Moved  as of',
              //dates: new Date(),
              //Address: '123 Lincon Road'

    })
} )

app.get('/About',(req,res) => {

  res.render('About',{
            greet: 'Mr:',
            name: 'Anoop Sivadas',
            title: 'Sr Associate-Projects',
            company: 'COGNIZANT'
  })
} )

app.get('/help',(req,res) => {
 //   console.log(req.url.substring(1))
  res.render('help', {
              message: 'Help will be provided for those who asks!'
  })
})

app.get('/help/*',(req,res) => {
  //   console.log(req.url.substring(1))
   res.render('error404', {
               message: 'This help article is not existing or it may have been moved!'
   })
 })
 
//check the intial code and why didn't it worked!!!
//tried intially calling the function geocode like var datatosend = geocode(1) ,
//but datatosend returned as 'UNDEFINED'
app.get('/weather',(req,res) => {

    //if (req.url.substring(1) === 'weather'){
    if (!req.query.address){  
        
        return res.send({
          error: 'Address Must be provided get the weather'
        })
    }

    //geocode('Paris',(error,geodata) => {
    geocode(req.query.address,(error,geodata) => {  

            if (error){
                //return res.send('<h1>' + error + '</h1>')
                return res.send({error: error})
            }
          
            forecast(geodata.longitude,geodata.latitude,(error,data) => {
          
              if (error){

                //return res.send('<h1>' + error + '</h1>')
                return res.send({error: error})
              }
               
              //res.send('<h1>' + geodata.location + ' , ' + data + '</h1>')
              //return (geodata.location + ' , ' + data)
              res.send({
                location: geodata.location,
                geodata: data
              })
          
          
            })
            
            
        })

       // console.log (datatosend)
        
   // res.send('<h1>' + datatosend + '</h1>')
} )
app.get('*',(req,res) => {
  //   console.log(req.url.substring(1))
   res.render('error404', {
               message: 'The page you requested cannot be found!'
   })
 })

app.listen(port,() => {

    console.log('Server is Up and Running at port' + port)
} )


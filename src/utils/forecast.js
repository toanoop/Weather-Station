const request = require('request')

const forecast = (long,lat,callback)=> {

const url = 'http://api.weatherstack.com/current?access_key=67c20bfbf19f60ddb9d7de933737f049&query=' + encodeURIComponent(long) + ',' + encodeURIComponent(lat) + "'"

request({url: url,json:true},(error,response) => {
    
    if (error){
      //console.log("Unable to Connect to the Weather Services")
      callback("Unable to Connect to the Weather Services",undefined)
    } else if (response.body.error){
       // console.log("Unable to find location") 
      callback("Unable to find location,Check the Coordinates",undefined)
      
    } else{
       //console.log("Weather is " + response.body.current.weather_descriptions[0] + " temperature is  " + response.body.current.temperature + " celsius , Feels like  " + response.body.current.feelslike)
    callback(undefined ,"Weather is " + response.body.current.weather_descriptions[0] + " temperature is  " + response.body.current.temperature + " celsius , Feels like  " + response.body.current.feelslike + "Humidity is  " + response.body.current.humidity) 
    }
   
})

}

module.exports = forecast

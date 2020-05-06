const request = require('request')
const geocode = (locname,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(locname)+'.json?access_token=pk.eyJ1IjoidG9hbm9vcCIsImEiOiJjazlmNzY2cGIwMTM4M21ueHVjdGd2bmsxIn0.cw1dAB4R6yDt2FdfUMDd-Q'
    
    request({url: url,json:true},(error,response) => {
    
        if (error){
      
          callback("Unable to Connect to the Geolocation Services",undefined)
        } else if (response.body.features.length === 0){
           
          callback("Unable to find location,location might be Wrong",undefined)
          
        } else{
           
        callback(undefined ,{location: response.body.features[0].text,
                             longitude: response.body.features[0].geometry.coordinates[0],
                             latitude : response.body.features[0].geometry.coordinates[1]}
         )}
            
   })


}

module.exports = geocode


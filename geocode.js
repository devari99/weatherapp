const request = require('request')

const geocode = (address = "Abidjan", cb) =>{//country=CI&
    const latLongUrl  =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?language=fr&access_token=pk.eyJ1IjoiYXJpbnRlY2siLCJhIjoiY2t2Y3l3b3FiNnR2bTMwczczdzllN2JqZCJ9.B_BeoEQg67wX8CLhMb5PDw`
    request({url:latLongUrl, json:true}, (error, response) =>{
        if(error){
             cb(`An error found, unable to get ${address} coordinates`, undefined);
          }else if(response.statusCode == 401){
             cb("Invalid or no token given", undefined);
          }
          else if(response.statusCode == 404){
             cb("Please check your endpoint, location search may not given...", undefined);
          }
          else if(response.statusCode == 403){
             cb("Error found please check your account page...", undefined);
          }
          else if(response.statusCode == 429){
             cb(`Sory you can't get ${address} location...`, undefined);
          }else if(response.body.features.length == 0){
            cb(`Unable to get ${address} location try another search...`, undefined);
         }
          else{      
            const lat  = response.body.features[0].center[1];
            const lng =  response.body.features[0].center[0];  
            const lc =  response.body.features[0].place_name;  
            //console.log(response.body.features.length);
            const res = {
                latitute : lat,
                longitute : lng,
                location : lc
            }

             cb(undefined, res)
          }
    })
}

module.exports = geocode;

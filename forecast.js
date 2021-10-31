const request = require('request')

const weather = (coordinates, cb) =>{
    const {latitute, longitute, location} = coordinates;
    const weatherUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitute}&lon=${longitute}&units=metric&lang=fr&exclude=minutely&appid=831068f7ea0ce383671d8d7a4765fae1`;
    
    request({url:weatherUrl, json:true}, (error, response) =>{
        if(error){
            cb(`An error found, unable to get ${location} weather info`, undefined);
          }else if(response.statusCode == 400){
            cb("The given information is invalid", undefined);
          }
          else if(response.statusCode == 401){
            cb("Invalid API key given", undefined);
          }
          else if(response.statusCode == 404){
            cb("Error found please check your information url like also city name, coordinates...", undefined);
          }
          else if(response.statusCode == 429){
            cb(`Sory you can't get ${location} weather...`, undefined);
          }
          else{
              const weatherData = {
                  temperature : response.body.current.feels_like,
                  location:location 
              };
              cb(undefined, weatherData);
          }
    })
}

module.exports = weather;
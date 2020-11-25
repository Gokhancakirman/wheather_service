const axios = require('axios');

const forecast=(lat,long,callback)=>{
    const weatherstack_url="http://api.weatherstack.com/current?access_key=cbd1cf4b3544fffa05e5d31042cf4f56&query="+lat+","+long+"&units=m";
    axios.get(weatherstack_url)
        .then(function (response) {
            if (response.data.success===false)
            {
                callback(response.data.error.info,undefined);
            }
            else
            {
                const result=response.data.current.weather_descriptions[0]+" It is currenly "+response.data.current.temperature+" degrees out.It feels like "+response.data.current.feelslike+" degress out. Humidity is "+response.data.current.humidity+"%";
                callback(undefined,result);
            }
        })
        .catch(function (error) {
            callback("Unable to connect weather service!",undefined);
        });
};

module.exports=forecast

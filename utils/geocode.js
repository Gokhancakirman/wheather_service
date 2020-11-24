const axios = require('axios');

const geocode=(address,callback)=>{
    const geolocation_url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiZ29raGFuY2FraXJtYW4iLCJhIjoiY2tobWUyYnVsMjA4NDJ4bzl2dGdxeHZzaiJ9.2Jxm_VOm0oj2jNQQXSdQTg&limit=1";
    axios.get(geolocation_url).then((response)=>{
        if(response.data.features.length===0)
        {
            callback('Unable to find location. Try another search',undefined);
        }
        else
        {

            callback(undefined,{
                lat:response.data.features[0].center[1],
                long:response.data.features[0].center[0],
                location: response.data.features[0].place_name
            });
        }
    }).catch((error)=>{
        callback(error.message,undefined);
    });
};


module.exports=geocode
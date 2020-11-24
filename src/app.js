const express = require('express');
const hbs = require('hbs');
const path = require('path');
const geocode=require('../utils/geocode');
const forecast=require('../utils/forecast');

const app=express();
const port = process.env.PORT || 3000;

const pages_path= path.join(__dirname,"../template/pages");
const layout_path= path.join(__dirname,"../template/layouts");
const public_path=path.join(__dirname,"../public")

app.set('view engine', 'hbs');
app.set('views',pages_path);
app.use(express.static(public_path));
hbs.registerPartials(layout_path);

app.get('/',(req,res)=>{
   res.render('index',{
       title: 'Weather',
       name: 'Gökhan Çakırman'
   });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About page",
        name: "Gökhan Çakırman"
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title: "Help page",
        name: "Gökhan Çakırman"
    })
});

app.get('/weather',((req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: "You must provide address"
        });

    }
    geocode(req.query.address,(error,{lat,long,location} = {}) => {
        if(error)
        {
            return res.send({
               error
            });
        }
        forecast(lat,long,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    error
                });
            }
            return res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            });
        })
    });
}));

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: "Help content not found",
        name: "Gökhan Çakırman"
    });
});

app.get('*',(req, res) => {
    res.render('404',{
        title: "Page not found",
        name: "Gökhan Çakırman"
    });
});



app.listen(port,()=>{
    console.log("Server is up on port "+port);
});

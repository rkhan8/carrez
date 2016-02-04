var cheerio = require('cheerio');
var request = require('request');
var jsonfile = require('jsonfile');

var express = require('express');
var cookieParser = require('cookie-parser');

var jsonLeboncoin = require('./JSON/outputLeboncoin');
var city, cp, type, avgPricem2;
city = jsonLeboncoin.location.city;
cp = jsonLeboncoin.location.cp;
type = jsonLeboncoin.specificities.type;

var additionUrl = city+'-'+cp;
var url = "https://www.meilleursagents.com/prix-immobilier/"+jsonLeboncoin.location.city.toLowerCase()+"-"+jsonLeboncoin.location.cp+"/#estimates";



/*
//var app = express();
var jar = request.jar();
var cookie = request.cookie('session');
//cookie.value = browser.cookies.select({name:'session'})[0].value;

jar.setCookie(cookie);
request.get({
  uri:"https://www.meilleursagents.com/prix-immobilier/"+jsonLeboncoin.location.city.toLowerCase()+"-"+jsonLeboncoin.location.cp+"/#estimates",
  jar:jar
}, function(error, response, body){
    console.log(body);
});
*/


  request(url, function(error, response, html)
  {

      var $ = cheerio.load(html);
      //console.log(html);


      avgPricem2 = $("[class='small-4 medium-2 columns prices-summary__cell--median']").map(function()
      {
        return Number($(this).text().match(/[0-9,]/g).join("").replace(",", "."));
      }).slice(3);

      if(type == "Appartement")
      {
        avgPricem2 = avgPricem2.slice(0, 3);
      }

      if(type == "Maison")
      {
        avgPricem2 = avgPricem2.slice(3, 6);
      }

      var data_json =
      {
        pricePerm2 : avgPricem2,
        location :
        {
          city: city,
          cp : cp
        },
        specificities :
        {
          type : type,
        }
      };

      jsonfile.writeFile('./JSON/outputMeilleurAgent.json', data_json, {spaces: 2}, function(err)
      {
        if(!err)
        {
          console.error("The file has been generated");
        }

      })

  });

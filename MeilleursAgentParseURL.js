var cheerio = require('cheerio');
var request = require('request');
var jsonfile = require('jsonfile');

var express = require('express');
var cookieParser = require('cookie-parser');

var jsonLeboncoin = require('./JSON/outputLeboncoin');
var city, cp, type, avgPricem2;
city = jsonLeboncoin.location.city;
cp = jsonLeboncoin.location.cp;

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

function download(url,callback){
	var option = {
		hostname : 'www.meilleursagents.com',
		path : url,
		port : 80,
		headers:{
			'Cookie' : 'session=session'
		}
	}
	http.get(option, function(response){
		// proceed dowload...

    var url = "https://www.meilleursagents.com/prix-immobilier/"+jsonLeboncoin.location.city.toLowerCase()+"-"+jsonLeboncoin.location.cp+"/#estimates";
    //var url = "PageMeilleurAgents.txt";
    //http://www.meilleursagents.com/prix-immobilier/courbevoie-92400/#estimates

    //console.log(url);




    request(url, function(error, response, html)
    {
        type = jsonLeboncoin.specificities.type;

        var additionUrl = city+'-'+cp;

        var $ = cheerio.load(html);
        console.log(response);

        /*
        avgPricem2 = $("[class='small-4 medium-2 columns prices-summary__cell--median']").map(function()
      {
        return Number($(this).text().match(/[0-9,]/g).join("").replace(",", "."));
      }).slice(3);

        /*
        for(var i = 0; i < avgPricem2.size; i++)
        {
          avgPricem2 = i[80];
        }
        */

        /*.map(function()
      {
        return Number($this.)
      });
      */
      //onsole.log(avgPricem2.length);
      /*
        if(type == "Appartement")
        {
          avgPricem2 = avgPricem2.slice(0, 3);
          console.log(avgPricem2);
        }
    */








    });



	})
}


/*
app.use(cookieParser());

app.get('/cookie',function(req, res){
     res.cookie("Cookies :", req.cookies)
});

app.listen(8080);


//cookie
//eyJfaWQiOiIxOTAxZGNjN2Y3MWY0MTg5MzZmNzU4MTQ4YzViMzM2ZiIsIl9mcmVzaCI6dHJ1ZSwiYW5hbHl0aWNzX3RhZ3MiOltdLCJ1c2VyX2lkIjoxMzgzMzExfQ

var jsonLeboncoin = require('./JSON/outputLeboncoin');

city = jsonLeboncoin.location.city;
cp = jsonLeboncoin.location.cp;

//var additionUrl = jsonLeboncoin.location.city.toLowerCase()+'-'+jsonLeboncoin.location.cp;

var url = "https://www.meilleursagents.com/prix-immobilier/"+jsonLeboncoin.location.city.toLowerCase()+"-"+jsonLeboncoin.location.cp+"/#estimates";
//var url = "PageMeilleurAgents.txt";
//http://www.meilleursagents.com/prix-immobilier/courbevoie-92400/#estimates

//console.log(url);

var city, cp, type, avgPricem2;


request(url, function(error, response, html)
{
    type = jsonLeboncoin.specificities.type;

    var additionUrl = city+'-'+cp;

    var $ = cheerio.load(html);
    //console.log(html);

    avgPricem2 = $("[class='small-4 medium-2 columns prices-summary__cell--median']").map(function()
  {
    return Number($(this).text().match(/[0-9,]/g).join("").replace(",", "."));
  }).slice(3);

    /*
    for(var i = 0; i < avgPricem2.size; i++)
    {
      avgPricem2 = i[80];
    }
    */

    /*.map(function()
  {
    return Number($this.)
  });
  */
  //console.log(avgPricem2.length);
  /*
    if(type == "Appartement")
    {
      avgPricem2 = avgPricem2.slice(0, 3);
      console.log(avgPricem2);
    }
*/








//});

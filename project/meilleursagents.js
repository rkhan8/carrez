var cheerio = require('cheerio');
var request = require('request');
var jsonfile = require('jsonfile');

var jsonSchema = require('./JSON/MeilleuAgentJSON');
var jsonLeboncoin = require('./JSON/outputLeboncoin');

var city, cp, type, avgPricem2;
cityy = jsonLeboncoin.location.city;
console.log(cityy);
cpp = jsonLeboncoin.location.cp;

var url = "https://www.meilleursagents.com/prix-immobilier/"+cityy.toLowerCase()+"-"+cpp+"/#estimates";



request(url, function(error, response, html)
{

    var $ = cheerio.load(html);

    typee = jsonLeboncoin.specificities.type;

		avgPricem2 = $('.small-4.medium-2.columns').map(function () {
			return Number($(this).text().match(/[0-9,]/g).join("").replace(",", "."));
		}).slice(3);


		if (typee == "Appartement") {
			avgPricem2 = avgPricem2.slice(0, 3);

		}
		else if (typee == "Maison") {
			avgPricem2 = avgPricem2.slice(3, 6);
		}

    var deal = "";
    var estimatePriceLeboncoin = jsonLeboncoin.price / jsonLeboncoin.specificities.surface;

    if(estimatePriceLeboncoin < avgPricem2[1])
    {
      deal = "Yes";
    }
    if(estimatePriceLeboncoin > avgPricem2[1])
    {
      deal = "No";
    }
    if(estimatePriceLeboncoin = avgPricem2[1])
    {
      deal = "No";
    }

    jsonSchema.location.city = cityy;
    jsonSchema.location.cp = cpp;
    jsonSchema.specificities.type = typee;
    jsonSchema.specificities.pricem2 = avgPricem2[1];
    jsonSchema.good_deal = deal;


    jsonfile.writeFile('./JSON/outputMeilleurAgent.json', jsonSchema, {spaces: 2}, function(err)
    {
      if(!err)
      {
        console.error("The file has been generated");
      }
      else
      {
        console.error("The file hasn't been generated");
      }

    })


});

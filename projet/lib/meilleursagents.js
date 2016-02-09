var cheerio = require('cheerio');
var request = require('request');



module.exports = function(ville, cp, type, price, surface, callback)
{
  var cityy, cpp, typee, avgPricem2;
  cityy = ville; //data_json.location.city;
  cpp = cp;//data_json.location.cp;
  typee = type;

  var url = "https://www.meilleursagents.com/prix-immobilier/"+cityy.toLowerCase()+"-"+cpp+"/#estimates";


  request(url, function(error, response, html)
  {

      var $ = cheerio.load(html);

      //typee = data_json.specificities.type;

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
      var pricee, surfacee;
      pricee = price ;
      surfacee = surface;

      var estimatePriceLeboncoin = pricee / surfacee;

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

      var data_json = {
        location :
        {
          city : cityy,
          cp : cpp
        },
        specificities:
        {
          type : typee,
          pricem2 : avgPricem2
        },
        good_deal : deal
      };
      callback(data_json);
  });

}

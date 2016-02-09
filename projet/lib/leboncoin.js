

var cheerio = require('cheerio');
var request = require('request');

var data_json;

module.exports =
{
  getobj: function(url, callback)
  {
    request(url, function(error, response, html)
    {
      if(!error)
      {
        var $ = cheerio.load(html);

        var pricee, cityy, cpp, typee, piecee, surfacee;

        pricee =  parseInt($("[itemprop='price']").text().replace(" ",""));
        cityy = $("[itemprop='addressLocality']").text();
        cpp = parseInt($("[itemprop='postalCode']").text().replace(" ",""));

        var tabElement = $("[class='lbcParams criterias'] > table > tr > td");
        typee = tabElement[0].children[0].data;

        if(typee != "Appartement" && typee != "Maison")
        {
            typee = tabElement[1].children[0].data;
            piecee = parseInt(tabElement[2].children[0].data.replace(" ",""));
            surfacee = parseInt(tabElement[3].children[0].data.replace(" ",""));
            if(surfacee == null)
            {
              surfacee = parseInt(tabElement[4].children[0].data.replace(" ",""));
            }
        }
        else
        {
          piecee = parseInt(tabElement[1].children[0].data.replace(" ",""));
          surfacee = parseInt(tabElement[2].children[0].data.replace(" ",""));
          if(surfacee == null)
          {
            surfacee = parseInt(tabElement[3].children[0].data.replace(" ",""));
          }
        }

        data_json = {
          price : pricee,
          location :
          {
            city : cityy,
            cp : cpp
          },
          specificities :
          {
            type : typee,
            piece : pricee,
            surface : surfacee
          }
        };
        callback(null, data_json);
      }

    });
  },

}

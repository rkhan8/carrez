
var url = process.argv[2];

var cheerio = require('cheerio');
var request = require('request');
var jsonSchema = require('./JSON/LeboncoinJSON')
var jsonfile = require('jsonfile');


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

    jsonSchema.price = pricee;
    jsonSchema.location.city = cityy;
    jsonSchema.location.cp = cpp;
    jsonSchema.specificities.type = typee;
    jsonSchema.specificities.piece = piecee;
    jsonSchema.specificities.surface = surfacee;

    jsonfile.writeFile('./JSON/outputLeboncoin.json', jsonSchema, {spaces: 2}, function(err)
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

  }

});

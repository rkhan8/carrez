
var url = process.argv[2];

var cheerio = require('cheerio');
var request = require('request');

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
    typee = tabElement[1].children[0].data;
    piecee = parseInt(tabElement[2].children[0].data.replace(" ",""));
    surfacee = parseInt(tabElement[3].children[0].data.replace(" ",""));


    var data_json =
    {
      price : pricee,
      location :
      {
        city: cityy,
        cp : cpp
      },
      specificities :
      {
        type : typee,
        piece : piecee,
        surface : surfacee
      }
    };

    jsonfile.writeFile('./JSON/outputLeboncoin.json', data_json, {spaces: 2}, function(err)
    {
      if(!err)
      {
        console.error("The file has been generated");
      }

    })

  }

});

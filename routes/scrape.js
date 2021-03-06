var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


var sixtyFour ='https://hdh.ucsd.edu/DiningMenus/default.aspx?i=64';
var pines = 'https://hdh.ucsd.edu/DiningMenus/default.aspx?i=01';
var canyonVista = 'https://hdh.ucsd.edu/DiningMenus/default.aspx?i=24';
var cafeVentans = 'https://hdh.ucsd.edu/DiningMenus/default.aspx?i=18';
var foodWorx = 'https://hdh.ucsd.edu/DiningMenus/default.aspx?i=11';
var oceanViewTerrace = 'https://hdh.ucsd.edu/DiningMenus/default.aspx?i=05';
var restaurants = [
    sixtyFour,
    pines,
    canyonVista,
    cafeVentans,
    foodWorx,
    oceanViewTerrace
];

var roots = 'https://hdh.ucsd.edu/DiningMenus/default.aspx?i=32';
var goodys = 'https://hdh.ucsd.edu/DiningMenus/default.aspx?i=06';
var specialRestaurants = [
    roots,
    goodys
];

exports.scraper = function(req,res) {
    var bigTableObject = {table : []};

    for(i = 0; i < restaurants.length; ++i){
        var URL = restaurants[i];
        request(URL, function (error, response, html) {
            if (!error) {
                //Use cheerio to load page
                var $ = cheerio.load(html);
                //Select element with id of location (e.g. Pines, Foodworx, etc.)
                var dining_hall = $('#HoursLocations_locationName').text();
                var college = $('#HoursLocations_descrip1').text().split(" ")[0];
                //For each list item in unorder menu list, get item string with name and price/
                $('ul[class="itemList"] > li > a[href]').each(function (i, e) {

                    //unorganized Item Name ($price).
                    var data = $(this).text();
                    //split item by parenthesis and $.
                    var itemDetails = data.split(/\s\s\(\$/);
                    if(itemDetails.length > 1) {
                        var name = itemDetails[0];
                        var priceArr = itemDetails[1].split(")")
                        var price = priceArr[0];
                    }
                    else{
                        var name = itemDetails[0];
                        var price = null;
                    }
                    var link = $(this).attr('href');
                    //get the next element after <a> which is <img> and get alt description (Vegetarian, Vegan, etc.)
                    var veg = $(this).next().attr('alt');
                    //Construct a full URL from the relative link gather from <a>.
                    var fullLink = "https://hdh.ucsd.edu/DiningMenus/" + link.toString();
                    //console.log(loc + ", " + name + ", " + price + ", " + veg + ", " + fullLink);

                    request(fullLink, function (error2, response2, html2) {
                        if(!error2) {
                            var cal$ = cheerio.load(html2);
                            var calories = cal$('table #tblFacts span').text().toString().split(" ");
                            var calData = calories[1];
                            console.log(  "college: " + college +", dining_hall: " + dining_hall);
                            if(price) {
                                var myObj = {
                                    name: name,
                                    college: college,
                                    dining_hall: dining_hall,
                                    nutLink: fullLink,
                                    price: price,
                                    diet: veg,
                                    cal: calData
                                };
                                bigTableObject.table.push(myObj);
                                fs.writeFile('FoodsWithCalories.json', JSON.stringify(bigTableObject, null, 4), function (err) {
                                    //console.log("FoodsWithCalories.json was created successfully.");
                                })
                            }else{}
                        }
                    })
                })
            }
        })
    }
    for(j=0; j < specialRestaurants.length; j++){
        var URL = specialRestaurants[j];
        request(URL, function (error, response, html) {
            if (!error) {
                //Use cheerio to load page
                var $ = cheerio.load(html);
                //Select element with id of location (e.g. Pines, Foodworx, etc.)
                var dining_hall = $('#HoursLocations_locationName').text();
                var college = $('#HoursLocations_descrip1').text().split(" ")[0];
                //For each list item in unorder menu list, get item string with name and price/
                $('ul[class="SpecialtyItemList"] > li > a[href]').each(function (i, e) {

                    //unorganized Item Name ($price).
                    var data = $(this).text();
                    //split item by parenthesis and $.
                    var itemDetails = data.split(/\s\s\(\$/);
                    if(itemDetails.length > 1) {
                        var name = itemDetails[0];
                        var priceArr = itemDetails[1].split(")")
                        var price = priceArr[0];
                    }
                    else{
                        var name = itemDetails[0];
                        var price = null;
                    }
                    var link = $(this).attr('href');
                    //get the next element after <a> which is <img> and get alt description (Vegetarian, Vegan, etc.)
                    var veg = $(this).next().attr('alt');
                    //Construct a full URL from the relative link gather from <a>.
                    var fullLink = "https://hdh.ucsd.edu/DiningMenus/" + link.toString();
                    //console.log(loc + ", " + name + ", " + price + ", " + veg + ", " + fullLink);

                    request(fullLink, function (error2, response2, html2) {
                        if(!error2) {
                            var cal$ = cheerio.load(html2);
                            var calories = cal$('table #tblFacts span').text().toString().split(" ");
                            var calData = calories[1];
                            console.log(  "college: " + college +", dining_hall: " + dining_hall);
                            if(price) {
                                var myObj = {
                                    name: name,
                                    college: college,
                                    dining_hall: dining_hall,
                                    nutLink: fullLink,
                                    price: price,
                                    diet: veg,
                                    cal: calData
                                };
                                bigTableObject.table.push(myObj);
                                fs.writeFile('FoodsWithCalories.json', JSON.stringify(bigTableObject, null, 4), function (err) {
                                    //console.log("FoodsWithCalories.json was created successfully.");
                                })
                            }else{}
                        }
                    })
                })
            }
        })
    }
    res.send('check console.');
};

exports.collegeName = function(req, res){
    var json = require("../FoodsWithCalories.json");
    for(i in json.table){
        var coll = json.table[i].college;
        if(coll == "The") {
            json.table[i].college = "Sixth";
            console.log("Sixth");
        }
        if(coll == "Earl") {
            json.table[i].college = "Warren";
            console.log("Warren");
        }
        if(coll == "Thurgood") {
            json.table[i].college = "Marshall";
            console.log("Marshall"); 
        }
    }
    res.send("check console.")
};

exports.convert = function(req,res) {
    var sqlite3 = require('sqlite3').verbose();


    var json = require("../FoodsWithCalories.json");
    var foods = json.table;
    var db = new sqlite3.Database('data.db');
    db.serialize(function () {
        db.run("CREATE TABLE items (item TEXT, college TEXT, dining_hall TEXT, calories INTEGER, price REAL, dietary TEXT, nutLink TEXT)");

        var stmt = db.prepare("INSERT INTO items VALUES (?,?,?,?,?,?,?)");

        for (var ind in foods) {
            var name = foods[ind].name;
            var college = foods[ind].college;
            var dining_hall = foods[ind].dining_hall;
            var cal = foods[ind].cal;
            var price = foods[ind].price;
            var diet = foods[ind].diet;
            var nl = foods[ind].nutLink;
            if (price) {
                stmt.run(name, college, dining_hall, cal, price, diet, nl);
            }
        }
        stmt.finalize();

    });

    db.close();


    res.send('Check the console.');
};
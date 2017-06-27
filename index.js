var turfArea = require('@turf/area');
var fs = require('fs');

var campaigns = fs.readFileSync('./nome_campaigns.geojson');
campaigns = JSON.parse(campaigns);

console.log(campaigns.features.length);

var x = campaigns.features;

var csvWriter = require('csv-write-stream');
var writer = csvWriter({ headers: ['Name', 'Changeset', 'Area - km2']});
writer.pipe(fs.createWriteStream('out.csv'));


for (var i = 0; i < x.length; i ++) {
    var row = [];
    var area = turfArea(x[i]);
    var changeset = x[i].properties.changeset_;
    var name = x[i].properties.name;
    row.push(name);
    row.push(changeset);
    row.push(area/1000000);
    writer.write(row);

}

writer.end();

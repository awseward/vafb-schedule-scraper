var xRay = require('x-ray');
var x = xRay();

var vafb = require('./lib/vafbScrape');


function _log(label, thing) {
  var json = JSON.stringify(thing, undefined, 2);
  console.log('*** ' + label);
  console.log(json);
}

vafb.getLaunches(function(error, result) {
  if (error) {
    console.error(error);
  } else {
    _log('launches', result);
  }
});

var xRay = require('x-ray');
var x = xRay();

var vafb = require('./lib/vafbScrape');


function _log(label, thing) {
  var json = JSON.stringify(thing, undefined, 2);
  console.log('*** ' + label);
  console.log(json);
}

var _logLaunches = _log.bind(null, 'LAUNCHES');

vafb.getLaunches()
  .then(_logLaunches)
  .catch(console.error);

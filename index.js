var xRay = require('x-ray');
// Not sure why they have you do this in the demo...
var x = xRay();

var scheduleUrl = 'http://www.spacearchive.info/vafbsked.htm';

function _print(error, result) {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
  }
}

function _getRows(callback) {
  x(scheduleUrl, 'table', ['tr@html'])(callback);
}

function _getCells(rowHtml, callback) {
  x(rowHtml, ['td'])(callback);
}

function _extractRowData(cells) {
  return {
    date: cells[0],
    timeWindow: cells[1],
    vehicle: cells[2],
    silo: cells[3],
    comments: cells[4],
  };
}

_getRows(function(error, result) {
  var thing = result.slice(1);
  thing.forEach(function(row) {
    _getCells(row, function(error, cells) {
      console.log(_extractRowData(cells));
    });
  });
});

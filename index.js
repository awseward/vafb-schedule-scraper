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

function _getTable(callback) {
  x(scheduleUrl, 'table@html')(callback);
}

function _getRows(tableHtml, callback) {
  x(tableHtml, ['tr@html'])(callback);
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

_getTable(function(err, res) {
  _getRows(res, function(err1, res1) {
    var rows = res1.slice(1);
    rows.forEach(function(row) {
      _getCells(row, function(err2, res2) {
        console.log(_extractRowData(cells));
      });
    });
  });
});

// _getRows(function(error, result) {
//   var thing = result.slice(1);
//   thing.forEach(function(row) {
//     _getCells(row, function(error, cells) {
//       console.log(_extractRowData(cells));
//     });
//   });
// });

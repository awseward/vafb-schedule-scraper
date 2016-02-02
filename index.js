var xRay = require('x-ray');
var x = xRay();

var scheduleUrl = 'http://www.spacearchive.info/vafbsked.htm';

function _log(label, thing) {
  var json = JSON.stringify(thing, undefined, 2);
  console.log('*** ' + label);
  console.log(json);
}

function _isValidRow(row) {
  return row.cells.length === 5;
}

function _cleanString(input) {
  return (input || '').trim();
}

function _extractRowData(row) {
  var colNames = [ 'date', 'time', 'vehicle', 'silo', 'comments' ];

  return colNames.reduce(function(seed, colName, index) {
    seed[colName] = _cleanString(row.cells[index]);

    return seed;
  }, {});
}

x(scheduleUrl, 'table', {
  columnNames: x('tr', ['th']),
  rows: x('tr', [{
    cells: x(['td']),
  }]),
})(function (err, res) {
  var launches = res.rows
    .filter(_isValidRow)
    .map(_extractRowData);

  _log('launches', launches);
});


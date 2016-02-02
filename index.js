var xRay = require('x-ray');
var x = xRay();

var scheduleUrl = 'http://www.spacearchive.info/vafbsked.htm';

function _isValidRow(row) {
  return row.cells.length === 5;
}

function _cleanString(input) {
  return (input || '').trim();
}

function _extractRowData(row) {
  var cells = row.cells.map(_cleanString);

  return {
    date: cells[0],
    time: cells[1],
    vehicle: cells[2],
    silo: cells[3],
    comments: cells[4],
  };
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

  console.log('columnNames', res.columnNames);
  console.log('launches', launches);
});


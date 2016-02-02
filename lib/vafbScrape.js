var xRay = require('x-ray');
var x = xRay();

var scheduleUrl = 'http://www.spacearchive.info/vafbsked.htm';
var columnNames = [ 'date', 'time', 'vehicle', 'silo', 'comments' ];

function _isValidRow(row) {
  // FIXME: This smells
  return row.cells.length === 5;
}

function _cleanString(input) {
  return String(input || '').trim();
}

function _deserializeRow(row) {
  return columnNames.reduce(function(seed, colName, index) {
    seed[colName] = _cleanString(row.cells[index]);

    return seed;
  }, {});
}

function getLaunches(callback) {
  x(scheduleUrl, 'table', {
    columnNames: x('tr', ['th']),
    rows: x('tr', [{
      cells: x(['td']),
    }]),
  })(function (error, result) {
    if (error) {
      callback(error);
      return;
    }

    var launches = result
      .rows
      .filter(_isValidRow)
      .map(_deserializeRow);

    callback(undefined, launches);
  });
}

module.exports = {
  getLaunches,
};

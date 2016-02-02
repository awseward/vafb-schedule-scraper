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

function _scrapeLaunchTable(callback) {
  return x(scheduleUrl, 'table', {
    columnNames: x('tr', ['th']),
    rows: x('tr', [{
      cells: x(['td']),
    }]),
  })(callback);
}

function getLaunches() {
  return new Promise(function(resolve, reject) {
    _scrapeLaunchTable(function (error, result) {
      if (error) { reject(error); }
      else {
        var launches = result.rows
          .filter(_isValidRow)
          .map(_deserializeRow);

        resolve(launches);
      }
    });
  });
}

function getLaunchesCallback(callback) {
  _scrapeLaunchTable(function (error, result) {
    if (error) { callback(error); }
    else {
      var launches = result.rows
        .filter(_isValidRow)
        .map(_deserializeRow);

      callback(undefined, launches);
    }
  });
}

module.exports = {
  getLaunches,
  getLaunchesCallback,
};

var _ = require('ramda');
var accounting = require('accounting');
var cars = require('./cars.json');

// Exercise 1:
// ============
// Use _.compose() to rewrite the function below. Hint: _.prop() is curried.
var isLastInStock = function(cars) {
  var last_car = _.last(cars);
  return _.prop('in_stock', last_car);
};

// Solution:
var isLastInStockComposed = _.compose(_.prop('in_stock'), _.last);

// Exercise 2:
// ============
// Use _.compose(), _.prop() and _.head() to retrieve the name of the first car.

// Solution:
var nameOfFirstCar = _.compose(_.prop('name'), _.head);

// Exercise 3:
// ============
// Use the helper function _average to refactor averageDollarValue as a composition.
var _average = function(xs) {
  return _.reduce(_.add, 0, xs) / xs.length;
}; // <- leave be

var averageDollarValue = function(cars) {
  var dollar_values = _.map(function(c) {
    return c.dollar_value;
  }, cars);
  return _average(dollar_values);
};

// Solution:
var averageDollarValueComposed = _.compose(_average, _.map(_.prop('dollar_value')))

// Exercise 4:
// ============
// Write a function: sanitizeNames() using compose that returns a list of lowercase and underscored car's names: e.g: sanitizeNames([{name: 'Ferrari FF', horsepower: 660, dollar_value: 700000, in_stock: true}]) //=> ['ferrari_ff'].

var _underscore = _.replace(/\W+/g, '_'); //<-- leave this alone and use to sanitize

// Solution:
var sanitizeNames = _.map(_.compose(_.toLower, _underscore, _.prop('name')));

// Bonus 1:
// ============
// Refactor availablePrices with compose.

var availablePrices = function(cars) {
  var available_cars = _.filter(_.prop('in_stock'), cars);
  return available_cars.map(function(x) {
    return accounting.formatMoney(x.dollar_value);
  }).join(', ');
};
// Solution:
var availablePricesComposed = _.compose(_.join(', '), _.map(_.compose(accounting.formatMoney, _.prop('dollar_value'))), _.filter(_.prop('in_stock')));

// Bonus 2:
// ============
// Refactor to pointfree. Hint: you can use _.flip().

var fastestCar = function(cars) {
  var sorted = _.sortBy(function(car) {
    return car.horsepower;
  }, cars);
  var fastest = _.last(sorted);
  return fastest.name + ' is the fastest';
};

// Solution:
var fastestCarComposed = _.compose( _.flip(_.add)(' is the fastest') , _.prop('name') ,_.last, _.sortBy(_.prop('horsepower')));

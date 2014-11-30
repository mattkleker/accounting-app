import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('prorated-amount', 'ProratedAmountComponent', {
  // specify the other units that are required for this test
  needs: ['component:zero-clipboard','helper:moment']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});

test('it calculates days left in month when current date is first day of month', function() {
  var component = this.subject( {
    today: moment("2014-10-01")
  });  

  equal(component.get('daysLeftInMonth'), 30);
});

test('it calculates days left in month when current date is last day of month', function() {
  var component = this.subject( {
    today: moment("2014-10-31")
  });  

  equal(component.get('daysLeftInMonth'), 0);
});

test('it calculates prorate factor when current date is the first of the month', function() {
  var component = this.subject( {
    today: moment("2014-11-01")
  });

  equal(component.get('prorateFactor'), 29/30);
});

test('it calculates prorate factor when current date is mid month', function() {
  var component = this.subject( {
    today: moment("2014-11-15")
  });

  equal(component.get('prorateFactor'), 0.5);
});

test('it calculates prorate factor when current date is last day of month', function() {
  var component = this.subject( {
    today: moment("2014-10-31")
  });  

  equal(component.get('prorateFactor'), 0);
});

test('it calculates the rate properly', function() {
  var component = this.subject( {
    today: moment("2014-11-15"),
    monthlyAmount: 1000
  });  

  equal(component.get('proratedRate'), 500);
});

test('the blurb is correct when the date is the 18th', function() {
  var component = this.subject( {
    today: moment("2014-11-18"),
    monthlyAmount: 1000,
    includeNextMonth: true
  });  

  equal(component.get('blurb'), " **This 1000/month fee is prorated to cover 11/18/2014 - 12/31/2014");
});

// 
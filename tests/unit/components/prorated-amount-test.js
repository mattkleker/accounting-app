import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('prorated-amount', 'ProratedAmountComponent', {
  // specify the other units that are required for this test
  needs: ['component:zero-clipboard']
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


test('it calculates daysInMonth', function() {
  var component = this.subject( {
    today: new Date("October 13, 2014 11:13:00")
  });  
  
  equal(component.get('daysInMonth'), 31);
});

test('it calculates prorate factor when current date is the first of the month', function() {
  var component = this.subject( {
    today: new Date("November 1, 2014 11:13:00")
  });

  equal(component.get('prorateFactor'), 1-1/30);
});

test('it calculates prorate factor when current date is mid month', function() {
  var component = this.subject( {
    today: new Date("November 15, 2014 11:13:00")
  });

  equal(component.get('prorateFactor'), 0.5);
});

test('it calculates prorate factor when current date is last day of month', function() {
  var component = this.subject( {
    today: new Date("October 31, 2014 11:13:00")
  });  

  equal(component.get('prorateFactor'), 0);
});

// test('it calculates correct prorated rate', function() {

// });
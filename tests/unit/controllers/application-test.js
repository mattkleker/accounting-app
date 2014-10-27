import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:application', 'ApplicationController', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function() {
  var controller = this.subject();
  ok(controller);
});

test('it calculates prorate factor when current date is in middle of month', function() {
  var controller = this.subject( {
    date: 15,
    daysInMonth: 30
  });  
  
  equal(controller.get('prorateFactor'), 0.5);
});

test('it calculates prorate factor when current date is last day of month', function() {
  var controller = this.subject( {
    date: 30,
    daysInMonth: 30
  });  

  equal(controller.get('prorateFactor'), 0);
});

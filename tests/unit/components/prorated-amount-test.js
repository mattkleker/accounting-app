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


// test('it calculates prorate factor when current date is in middle of month', function() {
//   var controller = this.subject( {
//     date: 15,
//     daysInMonth: 30
//   });  
  
//   equal(controller.get('prorateFactor'), 0.5);
// });

// test('it calculates prorate factor when current date is last day of month', function() {
//   var controller = this.subject( {
//     date: 30,
//     daysInMonth: 30
//   });  

//   equal(controller.get('prorateFactor'), 0);
// });

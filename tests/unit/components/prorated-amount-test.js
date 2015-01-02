import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import { initialize } from '../../../initializers/ember-moment';

moduleForComponent('prorated-amount', 'ProratedAmountComponent', {
  // specify the other units that are required for this test
  needs: ['component:zero-clipboard'],
  setup: function (container) {
    Ember.run(function () {
      // these two arguments are not used
      // but probably still good to pass them in
      // in the event we leverage them in the future
      initialize(container);
    });
  }
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  Ember.run(function() {
    equal(component._state, 'inDOM');
  });
});

test('it sets the start date to tomorrow', function() {
  var component = this.subject( {

  });

  equal(component.get('startDate').date(), moment().add(1,"days").date());
});

test('it sets the end date to the end of the month if start date is the first', function() {
  var component = this.subject( {
    startDate: moment("2015-01-01")
  });

  equal(component.get('endDate').date(), 31);
});

test('it sets the end date to the end of the next month if start date is the 18th', function() {
  var component = this.subject( {
    startDate: moment("2015-01-18")
  });

  equal(component.get('endDate').date(), 28);
});

test('start date: it calculates days left in month when current date is first day of month', function() {
  var component = this.subject( {
    startDate: moment("2014-10-01")
  });

  equal(component.get('startDateProrateDays'), 31);
});

test('start date: it calculates days left in month when current date is last day of month', function() {
  var component = this.subject( {
    startDate: moment("2014-10-31")
  });

  equal(component.get('startDateProrateDays'), 1);
});

test('end date: it calculates zero days left in month when startDate and endDate are in the same month', function() {
  var component = this.subject( {
    startDate: moment("2014-10-02"),
    endDate: moment("2014-10-03")
  });

  equal(component.get('endDateProrateDays'), 0);
});

test('start date: it calculates days left in month when startDate and endDate are in the same month', function() {
  var component = this.subject( {
    startDate: moment("2014-10-02"),
    endDate: moment("2014-10-03")
  });

  equal(component.get('startDateProrateDays'), 2);
});

test('end date: it calculates number of days to prorate when end date is first day of month', function() {
  var component = this.subject( {
    startDate: moment("2014-09-01"),
    endDate: moment("2014-10-01")
  });

  equal(component.get('endDateProrateDays'), 1);
});

test('end date: it calculates number of days to prorate when end date is last day of month', function() {
  var component = this.subject( {
    startDate: moment("2014-09-01"),
    endDate: moment("2014-10-31")
  });

  equal(component.get('endDateProrateDays'), 31);
});

test('start date: it calculates prorated rate when start date is the first of the month', function() {
  var component = this.subject( {
    startDate: moment("2014-11-01"),
    monthlyAmount: 1000
  });

  equal(Math.round(component.get('startDateProratedRate')), 1000);
});

test('start date: it calculates prorated rate when start date is mid month', function() {
  var component = this.subject( {
    startDate: moment("2014-11-16"),
    monthlyAmount: 1000
  });

  equal(Math.round(component.get('startDateProratedRate')), 500);
});

test('start date: it calculates prorated rate when start date is last day of month', function() {
  var component = this.subject( {
    startDate: moment("2014-10-31"),
    monthlyAmount: 1000
  });

  equal(component.get('startDateProratedRate'), 1000/31);
});

test('end date: it calculates prorated rate when end date is the first of the month', function() {
  var component = this.subject( {
    startDate: moment("2014-10-01"),
    endDate: moment("2014-11-01"),
    monthlyAmount: 1000
  });

  equal(component.get('endDateProratedRate'), 1000/30);
});

test('end date: it calculates prorated rate when end date is mid month', function() {
  var component = this.subject( {
    startDate: moment("2014-10-01"),
    endDate: moment("2014-11-15"),
    monthlyAmount: 1000
  });

  equal(Math.round(component.get('endDateProratedRate')), 500);
});

test('end date: it calculates prorated rate when end date is last day of month', function() {
  var component = this.subject( {
    startDate: moment("2014-09-01"),
    endDate: moment("2014-10-31"),
    monthlyAmount: 1000
  });

  equal(component.get('endDateProratedRate'), 1000);
});

test('it calculates the number of middle months when middleMonthCount is greater than one', function() {
  var component = this.subject( {
    startDate: moment("2014-09-01"),
    endDate: moment("2014-12-15")
  });

  equal(component.get('middleMonthCount'), 2);
});

test('it calculates the number of middle months when startDate and endDate are in consecutive months', function() {
  var component = this.subject( {
    startDate: moment("2014-09-01"),
    endDate: moment("2014-10-15")
  });

  equal(component.get('middleMonthCount'), 0);
});

test('it calculates the number of middle months when startDate and endDate are in the same month', function() {
  var component = this.subject( {
    startDate: moment("2014-09-01"),
    endDate: moment("2014-09-15")
  });

equal(component.get('middleMonthCount'), 0);
});

test('it calculates the rate properly when the start and end dates are in the same month', function() {
  var component = this.subject( {
    startDate: moment("2014-09-01"),
    endDate: moment("2014-09-15"),
    monthlyAmount: 1000
  });

  equal(Math.round(component.get('proratedRate')), 500);
});

test('it calculates the rate properly when the start and end dates are one month apart', function() {
  var component = this.subject( {
    startDate: moment("2014-08-01"),
    endDate: moment("2014-09-15"),
    monthlyAmount: 1000
  });

  equal(component.get('proratedRate'), 1500);
});

test('it calculates the rate properly when the start and end dates are more than a month apart', function() {
  var component = this.subject( {
    startDate: moment("2014-09-01"),
    endDate: moment("2014-11-15"),
    monthlyAmount: 1000
  });

  equal(component.get('proratedRate'), 2500);
});

test('the blurb is correct', function() {
  var component = this.subject( {
    startDate: moment("2014-11-18"),
    endDate: moment("2014-11-30"),
    monthlyAmount: 1000,
  });

  equal(component.get('blurb'), "  **This $1000/month fee is prorated to cover 11/18/2014 - 11/30/2014");
});

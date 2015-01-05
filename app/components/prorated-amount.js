import Ember from 'ember';

export default Ember.Component.extend({

  // formattedValue: function() {
  //   return this.get('monthlyAmount').clone().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }.property('monthlyAmount'),

  // formattedValue: function() {
  //   var string = numeral(this.get('monthlyAmount').clone()).format('0,0');
  //   return string;
  // }.property('monthlyAmount'),

  today: moment(),

  startDateSetter: function() {
    this.set('start', moment().add(1,"day").format('MM/DD/YYYY'));
  }.on('init'),

  startDate: function() {
    return moment(this.get('start'));
  }.property('start'),

  startDateMonthEnd: function() {
    return this.get('startDate').clone().endOf("month");
  }.property('startDate'),

  startDateProrateDays: function() {
    var monthDiff = this.get('endDate').clone().startOf("month").diff(this.get('startDate').clone().startOf("month"), 'months');
    if (monthDiff > 0) {
      return this.get('startDateMonthEnd').diff(this.get('startDate'), 'days') + 1;
    }
      return this.get('endDate').diff(this.get('startDate'), 'days') + 1;
  }.property('startDate', 'startDateMonthEnd', 'endDate'),

  startDateProratedRate: function() {
    return this.get('monthlyAmount') / this.get('startDateMonthEnd').date() * this.get('startDateProrateDays');
  }.property('monthlyAmount', 'startDateMonthEnd', 'startDateProrateDays'),

  monthDiff: function() {
    return this.get('endDate').clone().startOf("month").diff(this.get('startDate').clone().startOf("month"), 'months');
  }.property('endDate', 'startDate'),

  endDateSetter: function() {
    if (this.get('startDate').date() > 17) {
      this.set('end', moment().add(1, "month").endOf("month").format('MM/DD/YYYY'));
    }
      this.set('end', moment().endOf("month").format('MM/DD/YYYY'));
    }.on('init').observes('startDate'),  

  endDate: function() {
    return moment(this.get('end'));
  }.property('end'),

  endDateMonthStart: function() {
    return this.get('endDate').clone().startOf("month");
  }.property('endDate'),

  endDateProrateDays: function() {
    if (this.get('monthDiff') > 0) {
    return this.get('endDate').diff(this.get('endDateMonthStart'), 'days') + 1;
    }
    return 0;
  }.property('endDate', 'endDateMonthStart', 'monthDiff'),

  endDateProratedRate: function() {
    return this.get('monthlyAmount') / this.get('endDate').clone().endOf("month").date() * this.get('endDateProrateDays');
  }.property('monthlyAmount', 'endDate', 'endDateProrateDays'),

  middleMonthCount: function() {
    if (this.get('monthDiff') > 1) {
      return this.get('monthDiff') - 1;
    }
    return 0;
  }.property('startDate', 'endDate', 'monthDiff'),

  proratedRate: function() {
    var rate = this.get('startDateProratedRate') + this.get('middleMonthCount') * this.get('monthlyAmount') + this.get('endDateProratedRate');
    return rate.toFixed(2);
  }.property('startDateProratedRate', 'middleMonthCount', 'monthlyAmount', 'endDateProratedRate'),

  blurb: function() {
    return '  **This $' + this.get('monthlyAmount') + '/month fee is prorated to cover ' + this.get('startDate').format("L") + " - " + this.get('endDate').format("L");
  }.property('monthlyAmount', 'startDate', 'endDate'),

  firstMonthEquation: function() {
    return this.get('startDate').format("MMMM") + ': $' + this.get('monthlyAmount') + ' / ' + this.get('startDate').clone().endOf("month").format("D") + ' x ' + this.get('startDateProrateDays') + " = " + this.get('startDateProratedRate').toFixed(2);
  }.property('startDate', 'monthlyAmount', 'startDateProrateDays', 'startDateProratedRate'), 

  middleMonthEquation: function() {
    var equation = "";
    if(this.get('middleMonthCount') > 0) {
      var i;
      for (i = 0; i < this.get('middleMonthCount'); i++) {
      equation += this.get('startDate').clone().add(i+1,"months").format("MMMM") + ": $" + this.get('monthlyAmount') + "<br>";
      }
    return equation;
    }
  }.property('middleMonthCount', 'startDate', 'monthlyAmount'),

  endMonthEquation: function() {
    if(this.get('monthDiff') > 0){
    return this.get('endDate').format("MMMM") + ': $' + this.get('monthlyAmount') + ' / ' + this.get('endDate').clone().endOf("month").format("D") + ' x ' + this.get('endDateProrateDays') + " = " + this.get('endDateProratedRate').toFixed(2);
    }
  }.property('monthDiff', 'endDate', 'monthlyAmount', 'endDateProrateDays', 'endDateProratedRate')

});

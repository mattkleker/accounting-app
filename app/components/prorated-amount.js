import Ember from 'ember';

export default Ember.Component.extend({

  // formattedValue: function() {
  //   return this.get('monthlyAmount').clone().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // }.property('monthlyAmount'),

  // formattedValue: function() {
  //   var string = numeral(this.get('monthlyAmount').clone()).format('0,0');
  //   return string;
  // }.property('monthlyAmount'),

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

  endDateSetter: function() {
    if (this.get('startDate').date() > 17) {
      this.set('end', moment().add(1, "month").endOf("month").format('MM/DD/YYYY'));
    }
      this.set('end', moment().endOf("month").format('MM/DD/YYYY'));
    }.on('init'),  

  endDate: function() {
    return moment(this.get('end'));
  }.property('end'),

  endDateMonthStart: function() {
    return this.get('endDate').clone().startOf("month");
  }.property('endDate'),

  endDateProrateDays: function() {
    var monthDiff = this.get('endDate').clone().startOf("month").diff(this.get('startDate').clone().startOf("month"), 'months');
    if (monthDiff > 0) {
    return this.get('endDate').diff(this.get('endDateMonthStart'), 'days') + 1;
    }
    return 0;
  }.property('endDate', 'endDateMonthStart'),

  endDateProratedRate: function() {
    return this.get('monthlyAmount') / this.get('endDate').clone().endOf("month").date() * this.get('endDateProrateDays');
  }.property('monthlyAmount', 'endDate', 'endDateProrateDays'),

  middleMonthCount: function() {
    var monthDiff = this.get('endDate').clone().startOf("month").diff(this.get('startDate').clone().startOf("month"), 'months');
    if (monthDiff > 1) {
      return monthDiff - 1;
    }
    return 0;
  }.property('startDate', 'endDate'),

  proratedRate: function() {
    return this.get('startDateProratedRate') + this.get('middleMonthCount') * this.get('monthlyAmount') + this.get('endDateProratedRate');
  }.property('startDateProratedRate', 'middleMonthCount', 'monthlyAmount', 'endDateProratedRate'),

  blurb: function() {
    return '  **This $' + this.get('monthlyAmount') + '/month fee is prorated to cover ' + this.get('startDate').format("L") + " - " + this.get('endDate').format("L");
  }.property('monthlyAmount', 'startDate', 'endDate')

});

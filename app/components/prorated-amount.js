import Ember from 'ember';
// import { moment } from 'ember-moment/computed';

export default Ember.Component.extend({

  // jsToday: new Date(),
  today: moment(),
  lastDayOfMonth: function() {
    return this.get('today').clone().endOf("month");
  }.property('today'),
  // todayMoment: moment(),

  // momentDate: moment(),
  // shortDate: moment('date', 'MM/DD/YYYY'),        


  // date: function() {
  //   return this.get('today').date();
  // }.property('today'),

  // daysInMonth: function() {

  //   var month = this.get('today').getMonth();

  //   var year = this.get('today').getFullYear();

  //   return new Date(year,month+1,0).getDate();
  // }.property('year', 'month'),


  daysLeftInMonth: function() {
    return this.get('lastDayOfMonth').date() - this.get('today').date();
  }.property('lastDayOfMonth', 'today'),

  prorateFactor: function() {
    return this.get('daysLeftInMonth') / this.get('lastDayOfMonth').date();
  }.property('daysLeftInMonth', 'lastDayOfMonth'),

  proratedRate: function() {
    var proratedAmount = this.get('monthlyAmount') * this.get('prorateFactor');
    if (this.get('includeNextMonth')) {
      return proratedAmount + parseInt(this.get('monthlyAmount'), 10);
    }
    return proratedAmount;
  }.property('prorateFactor','includeNextMonth','monthlyAmount'),

  blurb: function() {
    // var month = this.get('today').getMonth() + 1;

    // var year = this.get('today').getFullYear();

    // var lastDayOfMonth = new Date(year,month,0).getDate();

    return '  **This ' + this.get('monthlyAmount') + '/month fee is prorated to cover ' + this.get('today').add(1, "day").format("L") + " - " + this.get('lastDayOfMonth').format("L");
  }.property('monthlyAmount', 'today', "lastDayOfMonth"),

  copyBlurb: function() {

  }


});

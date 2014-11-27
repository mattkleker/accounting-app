import Ember from 'ember';

export default Ember.Component.extend({

  today: new Date(),
  // todayMoment: moment(),

  // momentDate: function() {
  //   return todayMoment;
  // }.property('todayMoment'),

momentDate: moment('date', 'LL'),



  date: function() {
    return this.get('today').getDate();
  }.property('today'),

  daysInMonth: function() {

    var month = this.get('today').getMonth();

    var year = this.get('today').getFullYear();

    return new Date(year,month+1,0).getDate();
  }.property('year', 'month'),


  daysLeftInMonth: function() {
    return this.get('daysInMonth') - this.get('date') ;
  }.property('daysInMonth', 'date'),

  prorateFactor: function() {
    return this.get('daysLeftInMonth') / this.get('daysInMonth');
  }.property('daysInMonth', 'date'),

  proratedRate: function() {
    var currentMonthAmount = this.get('monthlyAmount') * this.get('prorateFactor');
    if (this.get('includeNextMonth')) {
      return currentMonthAmount + this.get('monthlyAmount');
    }
    return currentMonthAmount;
  }.property('prorateFactor','includeNextMonth','monthlyAmount'),

  blurb: function() {
    var month = this.get('today').getMonth() + 1;

    var year = this.get('today').getFullYear();

    var lastDayOfMonth = new Date(year,month,0).getDate();

    return '  **This ' + this.get('monthlyAmount') + '/month fee is prorated to cover ' + month + '/' + this.get('date') + '/' + year + ' - ' + month + '/' + lastDayOfMonth + '/' + year;
  }.property('monthlyAmount', 'date'),

  copyBlurb: function() {

  }


});

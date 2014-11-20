import Ember from 'ember';

export default Ember.Controller.extend({
 
  monthlyAmount: 1250,
  monthlyAmount2: 1000,
  today: new Date(),

  // todayMoment: moment(),

  // momentDate: function() {
  //   return todayMoment;
  // }.property('todayMoment'),

  momentDate: function() {
    return moment().format('LL');
  },

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

//section for first prorated rate

  proratedRate: function() {
    return this.get('monthlyAmount') * this.get('prorateFactor');
  }.property('monthlyAmount', 'prorateFactor'),

  blurb: function() {
    var month = this.get('today').getMonth() + 1;

    var year = this.get('today').getFullYear();

    var lastDayOfMonth = new Date(year,month,0).getDate();

    return '  **This ' + this.get('monthlyAmount') + '/month fee is prorated to cover ' 
    + month + '/' + this.get('date') + '/' + year + ' - ' + month + '/' + lastDayOfMonth + '/' + year;
  }.property('monthlyAmount', 'date'),

//section for second prorated rate

  proratedRate2: function() {
    return this.get('monthlyAmount2') * this.get('prorateFactor');
  }.property('monthlyAmount2', 'prorateFactor'),

  blurb2: function() {
    var month = this.get('today').getMonth() + 1;

    var year = this.get('today').getFullYear();

    var lastDayOfMonth = new Date(year,month,0).getDate();

    return '  **This ' + this.get('monthlyAmount2') + '/month fee is prorated to cover ' 
    + month + '/' + this.get('date') + '/' + year + ' - ' + month + '/' + lastDayOfMonth + '/' + year;
  }.property('monthlyAmount2', 'date'),


  copyBlurb: function() {

  }

});


import Ember from 'ember';


export default Ember.Controller.extend({

  monthlyAmount: 1250,
  today: new Date(),
  // todayMoment: moment(),

  // momentDate: function() {
  //   return todayMoment;
  // }.property('todayMoment'),

  momentDate: function() {
    return moment().format('LL');
  }.property('today'),

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
    return this.get('monthlyAmount') * this.get('prorateFactor');
  }.property('monthlyAmount', 'prorateFactor')

});

//comment 
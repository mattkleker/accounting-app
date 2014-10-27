import Ember from 'ember';

export default Ember.Controller.extend({

  monthlyAmount: 1250,
  today: new Date(),

  date: function() {
    return this.get('today').getDate();
  }.property('today'),

  daysInMonth: function() {

    var month = this.get('today').getMonth();

    var year = this.get('today').getFullYear();

    return new Date(year,month+1,0).getDate();
  }.property('year', 'month'),

  prorateFactor: function() {
    return ( this.get('daysInMonth') - this.get('date') ) / this.get('daysInMonth');
  }.property('daysInMonth', 'date'),

  proratedRate: function() {
    return this.get('monthlyAmount') * this.get('prorateFactor');
  }.property('monthlyAmount', 'prorateFactor')

});


import Ember from 'ember';

export default Ember.Controller.extend({

  today: new Date(),
  
  month: function() {
    return this.get('today').getMonth();
  }.property('today'),

  year: function() {
    return this.get('today').getFullYear();
  }.property('today'),

  currentDate: function() {
    return this.get('today').getDate();
  }.property('today'),

  daysInMonth: function() {
    var daysInMonth = new Date(this.get('month'), this.get('year'), 0).getDate();

    return daysInMonth;
  }.property('decadeRate'),

  prorateFactor: function() {
    return (this.get('daysInMonth') - this.get('currentDate')) / this.get('daysInMonth');
  }.property('daysInMonth', 'currentDate'),

  proratedAmount: function() {
    return this.get('monthlyAmount') * this.get('prorateFactor');
  }.property('monthlyAmount', 'prorateFactor')

});

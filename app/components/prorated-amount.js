import Ember from 'ember';

export default Ember.Component.extend({

  today: moment(),
  lastDayOfMonth: function() {
    return this.get('today').clone().endOf("month");
  }.property('today'),

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
    return '  **This ' + this.get('monthlyAmount') + '/month fee is prorated to cover ' + this.get('today').clone().add(1, "day").format("L") + " - " + this.get('lastDayOfMonth').format("L");
  }.property('monthlyAmount', 'today', "lastDayOfMonth"),

  copyBlurb: function() {

  }


});

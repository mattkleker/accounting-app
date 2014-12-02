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

  prorateEquation: function() {
      var equation = "Prorated rate: " + this.get('monthlyAmount') + " / " + this.get('lastDayOfMonth').format("D") + " x " + this.get('daysLeftInMonth');
      if (this.get('includeNextMonth')) {
        return equation + " + " + this.get('monthlyAmount') + " =";
      }
      return equation + " =";
  }.property('monthlyAmount','lastDayOfMonth','daysLeftInMonth','includeNextMonth'),

  proratedRate: function() {
    var proratedAmount = this.get('monthlyAmount') * this.get('prorateFactor');
    if (this.get('includeNextMonth')) {
      return proratedAmount + parseInt(this.get('monthlyAmount'), 10);
    }
    return proratedAmount;
  }.property('prorateFactor','includeNextMonth','monthlyAmount'),

  blurb: function() {
    var blurb = '  **This ' + this.get('monthlyAmount') + '/month fee is prorated to cover ' + this.get('today').clone().add(1, "day").format("L") + " - ";
    if (this.get('includeNextMonth')) {
      blurb += this.get('today').clone().add(1, "month").endOf("month").format("L");
    } else {
      blurb += this.get('lastDayOfMonth').format("L");
    }
    return blurb;
  }.property('monthlyAmount', 'today', "lastDayOfMonth","includeNextMonth"),

});

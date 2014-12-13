import Ember from 'ember';

export default Ember.Controller.extend({

  today: moment(),
  lastDayOfMonth: function() {
    return this.get('today').clone().endOf("month");
  }.property('today'),
 
  setDefaultIncludeNextMonth: function() {
    var today = new Date();
    if (today.getDate() >17) {
      this.set('includeNextMonth', true);
    }
  }.on("init")



});


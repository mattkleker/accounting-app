import Ember from 'ember';

export default Ember.Controller.extend({
 
  setDefaultIncludeNextMonth: function() {
    var today = new Date();
    if (today.getDate() >17) {
      this.set('includeNextMonth', true);
    }
  }.on("init")

});


import Ember from 'ember';

export default Ember.TextField.extend({

    allowNumbersOnly: function() {
    var strippedVal = this.get('value').replace(/[^0-9\.]+/g, '');

    this.set('value', strippedVal);
  }.observes('value')

});

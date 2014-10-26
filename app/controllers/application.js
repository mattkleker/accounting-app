import Ember from 'ember';

export default Ember.Controller.extend({

	annualRate: function() {
		return this.get('monthlyRate') * 12;
	}.property('monthlyRate')

});

import ZeroClipboard from 'ember-cli-zero-clipboard/components/zero-clipboard';
import Ember from 'ember';

export default ZeroClipboard.extend({
  classNames: ['zeroclipboard'],

  setup: function() {
    this.set('displayLabel', this.get('label'));
  }.on('didInsertElement'),

  actions: {
    afterCopy: function(){
      this.set('displayLabel', this.get('afterCopyLabel'));

      Ember.run.later(this, (function() {
        this.set('displayLabel', this.get('label'));
      }), 1500);
    }
  }
});

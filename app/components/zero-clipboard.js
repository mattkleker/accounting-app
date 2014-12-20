import ZeroClipboard from 'ember-cli-zero-clipboard/components/zero-clipboard';

export default ZeroClipboard.extend({
  actions: {
    afterCopy: function(){
      var originalLabel = this.get('label');

      this.set('label', this.get('afterCopyLabel'));

      Ember.run.later(this, (function() {
        this.set('label', originalLabel);
      }), 2000);
    }
  }
});

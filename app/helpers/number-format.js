import Ember from 'ember';

export function numberFormat(input) {
  return Math.floor(input);
};

export default Ember.Handlebars.makeBoundHelper(numberFormat);

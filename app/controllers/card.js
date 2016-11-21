import Ember from 'ember';

const {
    computed
} = Ember;

export default Ember.Controller.extend({
    card: computed.reads('model')
});

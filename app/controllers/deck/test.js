import Ember from 'ember';

const {
    computed,
    Controller
} = Ember;

export default Controller.extend({
    deck: computed.reads('model')
});

import Ember from 'ember';

const {
    inject,
    Controller
} = Ember;

export default Controller.extend({
    session: inject.service()
});

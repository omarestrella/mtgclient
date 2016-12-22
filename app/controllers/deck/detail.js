import Ember from 'ember';

const {
    inject,
    computed,
    Controller
} = Ember;

export default Controller.extend({
    session: inject.service(),

    deck: computed.reads('model'),

    canEdit: computed('deck.user.id', 'session.user.id', function () {
        return this.get('deck.user.id') === this.get('session.user.id');
    })
});

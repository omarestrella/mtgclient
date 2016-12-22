import Ember from 'ember';

const {
    inject,
    Route
} = Ember;

export default Route.extend({
    store: inject.service(),
    session: inject.service(),

    beforeModel({ params }) {
        const deckId = params['deck.detail'].id;
        return this.get('store').findRecord('deck', deckId).then(deck => {
            if (deck.get('user.id') !== this.get('session.user.id')) {
                this.transitionTo('deck.detail', deckId);
            }
        });
    },

    // setupController(controller) {
    //     this._super(...arguments);
    // }
});

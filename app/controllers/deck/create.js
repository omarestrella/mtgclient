import Ember from 'ember';

const {
    inject,
    Controller
} = Ember;

export default Controller.extend({
    ajax: inject.service(),
    store: inject.service(),
    session: inject.service(),

    name: null,
    private: false,

    actions: {
        createDeck() {
            const name = this.get('name');
            const privateDeck = this.get('private');
            const data = {
                title: name,
                private: privateDeck,
                cards: [],
                user: {
                    type: 'User',
                    id: this.get('session.user.id')
                }
            };

            const model = this.get('store').createRecord('deck', data);

            model.save()
                .then(() => {
                    const id = model.get('id');
                    if (id) {
                        this.transitionToRoute('deck.edit', id);
                    }
                })
                .catch(err => {
                    Ember.Logger.error('Create deck error:', err);
                });
        }
    }
});

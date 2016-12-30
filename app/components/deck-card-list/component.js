import Ember from 'ember';

const {
    inject,
    Component
} = Ember;

export default Component.extend({
    classNames: ['deck-card-list'],

    ajax: inject.service(),

    editing: false,

    deck: null,
    collection: null,

    actions: {
        addCard(card) {
            card.incrementProperty('count');
            card.save().catch(() => {
                card.rollbackAttributes();
            });
        },

        removeCard(card) {
            card.decrementProperty('count');
            card.save().catch(() => {
                card.rollbackAttributes();
            });
        }
    }
});

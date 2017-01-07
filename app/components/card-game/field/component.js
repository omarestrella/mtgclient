import Ember from 'ember';

const {
    Component
} = Ember;

export default Component.extend({
    cards: [],

    actions: {
        addCard(card) {
            this.get('cards').pushObject(card);
        }
    }
});

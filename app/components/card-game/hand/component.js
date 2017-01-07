import Ember from 'ember';

const {
    Component
} = Ember;

export default Component.extend({
    hand: [],

    me: false,

    actions: {
        removeCard(card) {
            this.get('hand').removeObject(card);
        }
    }
});

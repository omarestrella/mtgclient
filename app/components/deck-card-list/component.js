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
        addCard: function (card, count) {
            var data = [
                {
                    card: card.id,
                    count: count + 1
                }
            ];

            this.saveCardData(data);
        },

        removeCard: function (card, count) {
            var data = [
                {
                    card: card.id,
                    count: count - 1
                }
            ];

            this.saveCardData(data);
        }
    },

    saveCardData: function (data) {
        var deck = this.get('deck');
        var path = deck.get('path');

        var postData = {
            data
        };

        this.get('ajax').post(`${path}update_cards/`, postData);
        // .then(function () {
        //     MTG.socket('deck').emit('deck_update', deck.get('id'));
        // });
    }
});

import Ember from 'ember';
import DS from 'ember-data';

const {
    inject,
    computed
} = Ember;

export default DS.Model.extend({
    session: inject.service(),

    user: DS.attr(),
    title: DS.attr(),
    private: DS.attr(),
    editGroup: DS.attr(),
    cards: DS.hasMany('deck-card'),

    path: computed('id', function () {
        return '/decks/' + this.get('id') + '/';
    }),

    size: function () {
        var counts = this.get('cards').mapBy('count');

        if (!counts || counts.length === 0) {
            return 0;
        }

        return counts.reduce(function (sum, num) {
            return sum + num;
        });
    }.property('cards.@each.count'),

    creatures: function () {
        return this.filterCardsOnType('Creature');
    }.property('cards.@each.type'),

    instants: function () {
        return this.filterCardsOnType('Instant');
    }.property('cards.@each.type'),

    sorceries: function () {
        return this.filterCardsOnType('Sorcery');
    }.property('cards.@each.type'),

    enchantments: function () {
        return this.filterCardsOnType('Enchantment');
    }.property('cards.@each.type'),

    lands: function () {
        return this.filterCardsOnType('Land');
    }.property('cards.@each.type'),

    canEdit: function () {
        var user = this.get('session.user.id');
        return this.get('editGroup').indexOf(user) > -1;
    }.property('session.user'),

    filterCardsOnType: function (type) {
        const cards = this.get('cards').map(card => card);

        const filtered = cards.filter(card => {
            const types = card.get('type') || [];
            return types.includes(type);
        });

        return filtered.sort(function (data) {
            return data.card.name;
        });
    }
});

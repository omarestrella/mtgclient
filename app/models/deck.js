import Ember from 'ember';
import DS from 'ember-data';

const {
    inject
} = Ember;

export default DS.Model.extend({
    session: inject.service(),

    user: DS.attr(),
    title: DS.attr(),
    private: DS.attr(),
    editGroup: DS.attr(),
    cards: DS.hasMany('card'),

    path: function () {
        return '/decks/' + this.get('id') + '/';
    }.property('id'),

    size: function () {
        var counts = this.get('cards').mapProperty('count');

        if (!counts || counts.length === 0) {
            return 0;
        }

        return _.reduce(counts, function (sum, num) {
            return sum + num;
        });
    }.property('cards.[]'),

    creatures: function () {
        return this.filterCardsOnType('Creature');
    }.property('cards.[]'),

    instants: function () {
        return this.filterCardsOnType('Instant');
    }.property('cards.[]'),

    sorceries: function () {
        return this.filterCardsOnType('Sorcery');
    }.property('cards.[]'),

    enchantments: function () {
        return this.filterCardsOnType('Enchantment');
    }.property('cards.[]'),

    lands: function () {
        return this.filterCardsOnType('Land');
    }.property('lands.[]'),

    canEdit: function () {
        var user = this.get('session.user.id');
        return this.get('editGroup').indexOf(user) > -1;
    }.property('session.user'),

    filterCardsOnType: function (type) {
        var cards = this.get('cards');
        var filtered = cards.filter(function (detail) {
            return detail.card.types.include(type);
        });

        return filtered.sort(function (data) {
            return data.card.name;
        });
    }
});

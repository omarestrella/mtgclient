import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    text: DS.attr(),
    cmc: DS.attr(),
    typeName: DS.attr(),
    layout: DS.attr(),
    power: DS.attr(),
    toughness: DS.attr(),
    imageName: DS.attr(),
    multiverseId: DS.attr(),
    setNumber: DS.attr(),

    colors: DS.hasMany('card-color'),
    sets: DS.hasMany('card-set'),
    types: DS.hasMany('card-type'),
    subtypes: DS.hasMany('card-subtype'),

    shortSet: Ember.computed('sets.@each.name', function () {
        const set = this.get('sets.lastObject');
        const code = set.get('code');
        if (code) {
            return code.toLowerCase();
        }

        return '';
    }),

    mtgImage: Ember.computed('shortSet', function () {
        const setName = this.get('shortSet');
        const setNumber = this.get('setNumber');
        return `http://magiccards.info/scans/en/${setName}/${setNumber}.jpg`;
    }),

    gathererImage: Ember.computed('multiverseId', function () {
        const mid = this.get('multiverseId');
        return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${mid}&type=card`;
    })
});

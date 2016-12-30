import Ember from 'ember';
import DS from 'ember-data';

const {
    computed
} = Ember;

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

    colors: DS.attr(),
    sets: DS.attr(),
    types: DS.attr(),
    subtypes: DS.attr(),

    shortSet: computed('sets.[]', function () {
        const { code } = this.get('sets.lastObject');
        if (code) {
            return code.toLowerCase();
        }

        return '';
    }),

    mtgImage: computed('shortSet', function () {
        const setName = this.get('shortSet');
        const setNumber = this.get('setNumber');
        return `http://magiccards.info/scans/en/${setName}/${setNumber}.jpg`;
    }),

    gathererImage: computed('multiverseId', function () {
        const mid = this.get('multiverseId');
        return `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${mid}&type=card`;
    })
});

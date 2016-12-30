import Ember from 'ember';
import DS from 'ember-data';

const {
    computed
} = Ember;

export default DS.Model.extend({
    count: DS.attr(),
    card: DS.belongsTo('card'),

    type: computed('card.types.@each.name', function () {
        return this.get('card.types')
            .map(type => type.name);
    })
});

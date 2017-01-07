import DS from 'ember-data';
import Ember from 'ember';

const {
    attr,
    hasMany,
    Model
} = DS;

export default Model.extend({
    users: attr(),
    decks: hasMany('deck'),

    me: computed()
});

import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    code: DS.attr(),
    block: DS.attr(),
    release_date: DS.attr(),
    card: DS.belongsTo('card')
});

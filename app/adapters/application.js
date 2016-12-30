import Ember from 'ember';
import DS from 'ember-data';

const {
    inject,
    computed
} = Ember;

export default DS.RESTAdapter.extend({
    session: inject.service(),

    host: computed.reads('session.host'),

    buildURL() {
        const url = this._super(...arguments);
        return `${url}/`;
    },

    pathForType(type) {
        return Ember.String.pluralize(type);
    }
});

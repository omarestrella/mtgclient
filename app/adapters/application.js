import Ember from 'ember';
import DS from 'ember-data';

const {
    inject,
    computed
} = Ember;

export default DS.JSONAPIAdapter.extend({
    session: inject.service(),

    host: computed.reads('session.host'),

    buildURL() {
        const url = this._super(...arguments);
        return `${url}/`;
    }
});

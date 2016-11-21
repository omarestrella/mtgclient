import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';

export default AjaxService.extend({
    contentType: 'application/json',

    host: Ember.computed(function () {
        if (window.location.hostname === 'localhost') {
            return 'http://localhost:9000';
        }

        return 'http://gatheringapi.herokuapp.com';
    }),

    post(url, options = {}) {
        if (options.data && typeof options !== 'string') {
            options.data = JSON.stringify(options.data);
        }

        return this._super(...arguments);
    }
});

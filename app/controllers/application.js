import Ember from 'ember';

const {
    inject,
    computed,
    Controller
} = Ember;

export default Controller.extend({
    session: inject.service(),

    currentRouteClass: computed('currentRouteName', function () {
        const name = this.get('currentRouteName');
        return name.replace(/\./gi, '-');
    })
});

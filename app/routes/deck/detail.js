import Ember from 'ember';

const {
    Route
} = Ember;

export default Route.extend({
    actions: {
        willTransition(transition) {
            debugger;
        }
    },

    beforeModel() {
        const controller = this.controllerFor('deck');
        controller.set('editing', false);
    },

    model(params) {
        return this.store.findRecord('deck', params.id);
    }
});

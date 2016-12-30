import Ember from 'ember';

const {
    Route
} = Ember;

export default Route.extend({
    actions: {
        willTransition(transition) {
            if (transition.targetName === 'deck.edit') {
                this.controller.set('editing', true);
            } else {
                this.controller.set('editing', false);
            }
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

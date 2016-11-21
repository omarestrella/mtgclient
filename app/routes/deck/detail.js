import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function () {
        var controller = this.controllerFor('deck');
        controller.set('editMode', false);
    },

    model: function (params) {
        return this.store.findRecord('deck', params.id, { include: 'cards' });
    }
});

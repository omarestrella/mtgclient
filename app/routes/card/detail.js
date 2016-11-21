import Ember from 'ember';

export default Ember.Route.extend({
    beforeModel: function (transition) {
        var id = transition.params.id;
        var card = this.store.recordForId('card', id);

        if(card && !card.currentState.isEmpty && Ember.keys(card._data).length < 4) {
            return card.reload();
        }
    },

    model: function (params) {
        return this.store.find('card', params.id);
    }
});

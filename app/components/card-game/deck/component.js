import Ember from 'ember';

const {
    Component
} = Ember;

export default Component.extend({
    classNames: ['card-game-deck'],

    didUpdateAttrs() {
        this._super(...arguments);

        Ember.run.scheduleOnce('afterRender', this, this.drawHand);
    },

    drawHand() {
        const total = 7;
        for (let i = total; i; i--) {
            this.attrs.drawCard();
        }
    }
});

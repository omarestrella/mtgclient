import Ember from 'ember';

const {
    run,
    Component
} = Ember;

export default Component.extend({
    classNames: ['card-game'],

    game: null,

    actions: {
        drawCard(deck, hand) {
            this.get('manager').drawCard(deck, hand);
        }
    },

    didInsertElement() {
        this._super(...arguments);
        run.scheduleOnce('afterRender', this, this.setupGame);
    },

    setupGame() {
        this.get('game').startNewGame().then(manager => {
            this.set('manager', manager);

            this.set('currentDeck', manager.get('currentDeck'));
            this.set('opponentDeck', manager.get('opponentDeck'))

            this.set('currentHand', manager.get('currentHand'));
            this.set('opponentHand', manager.get('opponentHand'));
        });

    }
});

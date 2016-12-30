import Ember from 'ember';

const {
    copy,
    computed,
    generateGuid,
    Component
} = Ember;

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}

const GameCard = Ember.Object.extend({
    guid: null,
    card: null,

    name: computed.reads('card.name'),

    init() {
        this._super(...arguments);

        const guid = generateGuid(this, 'card');
        this.set('guid', guid);
    }
});

export default Component.extend({
    classNames: ['card-game'],

    actions: {
        drawCard() {
            const card = this.get('gameDeck').popObject();
            this.get('gameHand').pushObject(card);
        }
    },

    gameHand: computed(() => []),

    gameDeck: computed('deck.cards.[]', function () {
        const cards = this.get('deck.cards')
            .map(deckCard => {
                const card = deckCard.get('card');
                const count = deckCard.get('count');
                const collect = [];
                const data = copy(card.get('data'));
                for (let i = count; i; i--) {
                    const gameCard = GameCard.create({
                        card: data
                    });
                    collect.push(gameCard);
                }
                return collect;
            })
            .reduce((a, b) => a.concat(b));
        return shuffle(cards);
    })
});

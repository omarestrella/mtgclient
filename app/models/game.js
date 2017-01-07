import Ember from 'ember';
import DS from 'ember-data';

const {
    attr,
    hasMany,
    Model
} = DS;

const {
    copy,
    inject,
    getOwner,
    setOwner,
    computed,
    generateGuid,
    Object
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
    model: null,

    name: computed.reads('card.name'),

    init() {
        this._super(...arguments);

        const guid = generateGuid(this, 'card');
        this.set('guid', guid);
    }
});

const DECK_TOTAL = 60;

export const GameStateManager = Object.extend({
    game: null,

    me: computed.reads('game.me'),
    opponent: computed.reads('game.opponent'),

    playerDeck: computed.reads('game.playerDeck'),

    currentHand: null,
    currentDeck: null,

    opponentHand: null,
    opponentDeck: null,

    socket: null,

    init() {
        this._super(...arguments);

        this.setupServerConnection();

        this.setupOpponentData();
        this.setupPlayerData();
    },

    send(data) {
        self.socket.send(JSON.stringify(data));
    },

    drawCard(deck, hand) {
        const card = deck.popObject();
        hand.pushObject(card);

        this.send({
            action: 'draw',
            user: deck.get('user.id')
        });
    },

    setupServerConnection() {
        this.socket = new WebSocket(`ws://localhost:8000/game/${this.get('game.id')}/`);

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            const action = data.action;
            if (action = )
        }

        window.socket = this.socket;
    },

    setupOpponentData() {
        const deck = [];
        for (let i = 0; i < DECK_TOTAL - 7; i++) {
            deck.push(GameCard.create());
        }

        this.set('opponentHand', [1,2,3,4,5,6,7]);
        this.set('opponentDeck', deck);
    },

    setupPlayerData() {
        const hand = [];
        const deck = this.get('playerDeck.cards')
            .map(deckCard => {
                const card = deckCard.get('card');
                const count = deckCard.get('count');
                const collect = [];
                const data = copy(card.get('data'));
                for (let i = count; i; i--) {
                    const gameCard = GameCard.create({
                        model: deckCard,
                        card: data
                    });
                    collect.push(gameCard);
                }
                return collect;
            })
            .reduce((a, b) => a.concat(b));

        shuffle(deck);

        for (let i = 0; i < 7; i++) {
            const card = deck.popObject();
            hand.pushObject(card);
        }

        this.set('currentHand', hand);
        this.set('currentDeck', deck);
    }
});

export default Model.extend({
    session: inject.service(),

    users: attr(),
    decks: hasMany('deck'),

    me: computed('session.user.id', 'users', function () {
        const users = this.get('users');
        return users.find(user => user.id === this.get('session.user.id'));
    }),

    opponent: computed('session.user.id', 'users', function () {
        const users = this.get('users');
        return users.find(user => user.id !== this.get('session.user.id'));
    }),

    playerDeck: computed('me.id', 'decks.isFulfilled', function () {
        if (!this.get('decks.isFulfilled')) {
            return [];
        }

        const decks = this.get('decks').map(deck => deck);
        return decks.find(deck => deck.get('user.id') === this.get('me.id'));
    }),

    opponentDeck: computed('opponent.id', 'decks.isFulfilled', function () {
        if (!this.get('decks.isFulfilled')) {
            return;
        }

        const decks = this.get('decks').map(deck => deck);
        return decks.find(deck => deck.get('user.id') === this.get('opponent.id'));
    }),

    startNewGame() {
        return this.get('decks').then(() => {
            const manager = GameStateManager.create({
                game: this
            });
            setOwner(manager, getOwner(this));
            return manager;
        });
    }
});

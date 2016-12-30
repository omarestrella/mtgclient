import Ember from 'ember';

const {
    run,
    inject,
    computed,
    Component
} = Ember;

export default Component.extend({
    tagName: 'span',
    classNames: ['deck-card-detail'],

    store: inject.service(),

    card: null,
    count: 0,

    drop: null,
    imageUrl: computed.reads('card.mtgImage'),

    didInsertElement() {
        run.scheduleOnce('afterRender', this, this.attachDrop);
    },

    mouseEnter() {
        const drop = this.get('drop');
        if (drop) {
            drop.open();
        }
    },

    mouseLeave() {
        const drop = this.get('drop');
        if (drop) {
            drop.close();
        }
    },

    attachDrop() {
        const css = this.get('componentCssClassName');
        const drop = new window.Drop({
            target: this.$()[0],
            content: this.$('.card-data')[0],
            classes: `${css} drop-theme-arrows`,
            position: 'top right',
            tetherOptions: {
                attachment: 'top left',
                offset: '18px 0',
                constraints: [
                    {
                        to: 'window',
                        attachment: 'together'
                    }
                ]
            }
        });

        this.set('drop', drop);
    }
});

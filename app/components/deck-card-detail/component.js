import Ember from 'ember';

const {
    inject,
    Component
} = Ember;

export default Component.extend({
    tagName: 'span',
    classNames: ['deck-card-detail'],

    store: inject.service(),

    card: null,
    count: 0,

    imageUrl: null,

    attachHoverPreview: function () {
        var self = this;
        var card = this.get('card');

        this.$().hover(
            function () {
                this.get('store').find('card', card.id)
                    .then(function (c) {
                        if(c.get('set_name')) {
                            self.set('imageUrl', c.get('mtgImage'));

                            return null;
                        }

                        return c.reload().then(function (c) {
                            self.set('imageUrl', c.get('mtgImage'));
                        });
                    });
            },

            function () {
                self.set('imageUrl', null);
            }
        );
    }.on('didInsertElement'),

    removeListeners: function () {
        this.$().off('hover');
    }.on('willDestroyElement')
});

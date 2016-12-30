import Ember from 'ember';

export default Ember.Helper.extend({
    compute([text]) {
        text = Ember.Handlebars.Utils.escapeExpression(text);
        text = text.toString();
        text = text.replace(/(\r\n|\n|\r)/gm, '<br />');
        return new Ember.Handlebars.SafeString(text);
    }
});

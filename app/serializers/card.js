import Ember from 'ember';
import DS from 'ember-data';
import ApplicationSerializer from './application';

const {
    EmbeddedRecordsMixin
} = DS;

export default ApplicationSerializer.extend(EmbeddedRecordsMixin, {
    keyForAttribute(attr) {
        return Ember.String.underscore(attr);
    }
});

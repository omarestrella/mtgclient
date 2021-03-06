import DS from 'ember-data';
import ApplicationSerializer from './application';

const {
    EmbeddedRecordsMixin
} = DS;

export default ApplicationSerializer.extend(EmbeddedRecordsMixin, {
    attrs: {
        decks: { embedded: 'always' }
    }
});

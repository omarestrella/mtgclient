import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        const type = primaryModelClass.modelName;
        const { results } = payload;
        const data = {
            [type]: results
        };

        return  this._super(store, primaryModelClass, data, id, requestType);
    },

    normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
        const type = primaryModelClass.modelName;
        const data = {
            [type]: payload
        };

        return this._super(store, primaryModelClass, data, id, requestType);
    },

    serializeIntoHash(hash, typeClass, snapshot, options) {
        const data = this.serialize(snapshot, options);
        Object.assign(hash, data);
    }
});

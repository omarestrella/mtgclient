import Ember from 'ember';

export default Ember.Helper.extend({
    compute([collection]) {
        if (collection && !!collection.length) {
            var sums = collection.mapProperty('count');
            return sums.reduce(function (sum, num) {
                return sum + num;
            });
        }
        return 0;
    }
});

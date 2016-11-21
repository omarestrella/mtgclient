import AjaxService from '../services/ajax';

export default {
    name: 'ajax-service',
    initialize: function (application) {
        application.register('service:ajax', AjaxService);
    }
};

import Ember from 'ember';

function setAjaxPreflight (data) {
    Ember.$.cookie('token', data.token);
    var csrftoken = Ember.$.cookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    Ember.$.ajaxPrefilter(function(options, originalOptions, xhr) {
        options.xhrFields = {
            withCredentials: true
        };

        xhr.setRequestHeader('Authorization', `Token ${data.token}`);

        if (!csrfSafeMethod(options.type)) {
            xhr.setRequestHeader('X-CSRFToken', csrftoken);
        }
    });
}

const {
    computed,
    Service
} = Ember;

export default Service.extend({
    user: null,
    token: null,

    init() {
        this._super(...arguments);

        Ember.$.ajaxPrefilter(function(options /*, originalOptions, xhr*/) {
            options.xhrFields = {
                withCredentials: true
            };
        });
    },

    host: computed(function () {
        if (window.location.hostname === 'localhost') {
            return 'http://localhost:9000';
        }

        return 'http://gatheringapi.herokuapp.com';
    }),

    tokenCookie: computed(function () {
        return Ember.$.cookie('token');
    }).volatile(),

    isAuthenticated: computed('token', function () {
        return !!this.get('token') && !!this.get('tokenCookie');
    }),

    authenticateWithToken() {
        var self = this;
        var token = Ember.$.cookie('token');

        return new Ember.RSVP.Promise(function (resolve, reject) {
            if(!token) {
                reject();
            }

            var path = `${self.get('host')}/auth/`;
            var data = {
                token: token
            };

            Ember.$.post(path, data).then(
                function (data, status, xhr) {
                    self.handleAuthentication(data);

                    resolve(data, xhr);
                },
                function (data, status, xhr) {
                    reject(data, xhr);
                }
            );
        });
    },

    authenticateWithCredentials(username, password) {
        var self = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            var path = `${self.get('host')}/auth/`;
            var data = {
                username: username,
                password: password
            };

            Ember.$.post(path, data).then(
                function (data, status, xhr) {
                    if(data.token) {
                        self.handleAuthentication(data);

                        resolve(data, xhr);
                    } else {
                        reject(data, xhr);
                    }

                },
                function (data, status, xhr) {
                    reject(data, xhr);
                }
            );
        });
    },

    handleAuthentication(data) {
        this.set('token', data.token);
        this.set('user', data.user);
        setAjaxPreflight(data);
    },

    logout() {
        const path = `${this.get('host')}/auth/logout`;
        return this.get('ajax').post(path, {}).then(() => {
            Ember.$.removeCookie('token');

            this.set('token', null);
            this.set('user', null);
        }).catch(function () {
            Ember.Logger.error('Logout error');
        });
    }
});

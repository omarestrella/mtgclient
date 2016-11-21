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

        xhr.setRequestHeader('Authorization', 'Token %@'.fmt(data.token));

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

    host: computed(function () {
        if (window.location.hostname === 'localhost') {
            return 'http://localhost:9000';
        }

        return 'http://gatheringapi.herokuapp.com';
    }),

    init: function () {
        this._super(...arguments);

        Ember.$.ajaxPrefilter(function(options /*, originalOptions, xhr*/) {
            options.xhrFields = {
                withCredentials: true
            };
        });
    },

    tokenCookie: function () {
        return Ember.$.cookie('token');
    }.property(),

    isAuthenticated: function () {
        return this.get('token') !== null && this.get('tokenCookie');
    }.property('token'),

    authenticateWithToken: function () {
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

    authenticateWithCredentials: function (username, password) {
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

    handleAuthentication: function (data) {
        this.set('token', data.token);
        this.set('user', data.user);
        setAjaxPreflight(data);
    },

    logout: function () {
        var self = this;

        return new Ember.RSVP.Promise(function (resolve, reject) {
            var path = `${this.get('host')}/auth/logout`;
            Ember.$.post(path, {}).then(
                function () {
                    Ember.$.removeCookie('token');

                    self.set('token', null);
                    self.set('user', null);

                    resolve();
                },

                function () {
                    Ember.Logger.error('Logout error');
                    reject();
                }
            );
        });
    }
});

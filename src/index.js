var RSVP = require('rsvp');
var redis = require('redis');


function RedisAdapter(port, host) {
    this._db = redis.createClient(port, host);
}

MemoryAdapter.prototype = {
    getKeys: function getKeys() {
        return new RSVP.Promise(function(resolve, reject) {
            resolve(Object.keys(this._data));
        }.bind(this));
    },

    get: function get(key) {
        return new RSVP.Promise(function(resolve, reject) {
            this._db.get(key, function(error, result) {
                if(error) {
                    reject(error);
                }
                resolve(result);
            });
        }.bind(this));
    },

    set: function set(key, value) {
        return new RSVP.Promise(function(resolve, reject) {
            this._db.set(key, value, function(error, result) {
                if(error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        }.bind(this));
    },

    writer: function writer(qs) {
        this._db.get('results')
            .then(function(results) {
                results.push(qs);
                return this._db.set(results);
            }.bind(this))
    },

    reader: function reader() {
        return this._db.get('results');
    }
};



module.exports = MemoryAdapter;

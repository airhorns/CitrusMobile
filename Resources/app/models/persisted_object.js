(function() {
  var PersistedObject;
  var __hasProp = Object.prototype.hasOwnProperty, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  PersistedObject = function() {
    function PersistedObject(params) {
      var k, v;
      PersistedObject.__super__.constructor.call(this);
      for (k in params) {
        if (!__hasProp.call(params, k)) continue;
        v = params[k];
        if (_.isFunction(this[k])) {
          this[k].call(v);
        } else if (k === "lastSynched") {
          this.lastSynched = new Date(v);
        } else {
          this[k] = v;
        }
      }
      this.constructedWith = params;
      if (this.outOfSynch()) {
        this.markForSynching();
      }
      root.addEventListener("synch:start", __bind(function(e) {
        if (_.isFunction(this.synch) && this.markedToSynch) {
          return this.synch();
        }
      }, this));
    }
    __extends(PersistedObject, Citrus.Object);
    PersistedObject.prototype.refreshInterval = 1000;
    PersistedObject.prototype.markedToSynch = false;
    PersistedObject.loadFromPersistable = function(persisted) {
      var obj;
      if (_.isFunction(Citrus[persisted.type])) {
        obj = new Citrus[persisted.type](persisted);
        return obj;
      } else {
        Ti.API.error("Unrecognized persisted type " + persisted.type + ". Persistable is :");
        Ti.API.error(persisted);
        return false;
      }
    };
    PersistedObject.prototype.persistable = function() {
      var val, values, _i, _len, _ref;
      values = {
        type: this.type,
        lastSynched: _.isDate(this.lastSynched) ? this.lastSynched.getTime() : false
      };
      _ref = this.persistableAttributes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        val = _ref[_i];
        values[val] = this[val];
      }
      return values;
    };
    PersistedObject.prototype.newRecord = function() {
      return !(this.persisted != null);
    };
    PersistedObject.prototype.changed = function() {
      if (this.newRecord()) {
        return true;
      }
      return this.constructedWith === this.persistable();
    };
    PersistedObject.prototype.markAsSynched = function() {
      this.lastSynched = new Date();
      return this.markedToSynch = false;
    };
    PersistedObject.prototype.markForSynching = function() {
      return this.markedToSynch = true;
    };
    PersistedObject.prototype.outOfSynch = function() {
      if (!_.isDate(this.lastSynched)) {
        return true;
      }
      return ((new Date).getTime() - this.refreshInterval) < this.lastSynched.getTime();
    };
    return PersistedObject;
  }();
  Citrus.PersistedObject = PersistedObject;
}).call(this);

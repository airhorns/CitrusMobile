(function() {
  var AccountBasedAction, AccountlessAction, Action;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  Action = function(attributes) {
    var _ref, k, v;
    if (_.keys(attributes).length === (this.constructor.declares.length + Citrus.Action.alwaysDeclared.length)) {
      this.valid = true;
      _ref = attributes;
      for (k in _ref) {
        if (!__hasProp.call(_ref, k)) continue;
        v = _ref[k];
        d("Trying to set k => " + k.camelize(true) + " to " + v);
        k = k.camelize(true);
        if (_.isFunction(this[k])) {
          this.valid = (this.valid && this[k].call(v));
        } else {
          this[k] = v;
        }
      }
    } else {
      Ti.API.debug("Wrong amount of arguments passed to action constructor!");
      this.valid = false;
    }
    return this;
  };
  __extends(Action, Citrus.Object);
  Action.declares = [];
  Action.alwaysDeclared = ["actionText"];
  Action.prototype.valid = false;
  Action.prototype.icon = "images/account_icons/GenericAccount_16.png";
  Action.prototype.actionText = "";
  Action.prototype.readyToRun = function() {
    return true;
  };
  Action.prototype.run = function(success, failure) {
    return this.readyToRun() ? this.action(success, failure) : this.failure(null, "Not ready to run!");
  };
  Action.prototype.action = function(success, failure) {
    return success();
  };
  Action.prototype.button = function() {
    return true;
  };
  AccountlessAction = function() {
    return Action.apply(this, arguments);
  };
  __extends(AccountlessAction, Action);
  AccountlessAction.prototype.requiresAccount = function() {
    return false;
  };
  AccountBasedAction = function() {
    return Action.apply(this, arguments);
  };
  __extends(AccountBasedAction, Action);
  AccountBasedAction.prototype.requiresAccount = function() {
    return true;
  };
  AccountBasedAction.prototype.readyToRun = function(account) {
    return true;
  };
  AccountBasedAction.prototype.run = function(account, success, failure) {
    return this.readyToRun(account) ? this.action(account, success, failure) : this.failure(null, "Not ready to run!");
  };
  AccountBasedAction.prototype.action = function(account, success, failure) {
    return success();
  };
  Citrus.Action = Action;
  Citrus.Actions = {
    Twitter: {},
    Facebook: {},
    LinkedIn: {},
    Foursquare: {}
  };
  _.extend(Citrus.Actions, {
    newFromJSON: function(passed_attributes) {
      var _i, _len, _ref, action, attributes, namespace, scope, type, types;
      attributes = _.clone(passed_attributes || {});
      type = attributes['_type'];
      delete attributes['id'];
      if (type) {
        delete attributes['_type'];
        types = type.split("::");
        scope = Citrus;
        _ref = types;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          namespace = _ref[_i];
          if (!(_.isUndefined(scope[namespace]))) {
            scope = scope[namespace];
          } else {
            Ti.API.error("Unrecognized action namespace/type " + type + ". Looked at Citrus." + types.join("."));
            return false;
          }
        }
        if (_.isFunction(scope)) {
          action = new scope(attributes);
          if (action.valid) {
            return action;
          } else {
            Ti.API.error("Invalid action generated from attributes.");
            return false;
          }
        } else {
          Ti.API.error("Unrecognized action scope found at Citrus." + types.join(".") + ", it wasn't a function!");
          return false;
        }
      } else {
        Ti.API.error("Couldn't build action because no type attribute was provided.");
        return false;
      }
    }
  });
  Ti.include("/app/models/actions/platform/platform_action.js");
  Ti.include("/app/models/actions/twitter/twitter_action.js");
  Ti.include("/app/models/actions/foursquare/foursquare_action.js");
}).call(this);

(function() {
  var Action;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Citrus.Actions = {
    Platform: {},
    Twitter: {},
    Paypal: {},
    Facebook: {},
    LinkedIn: {},
    Foursquare: {},
    Mailchimp: {}
  };
  Action = function() {
    function Action(attributes) {
      var k, v;
      if (!(_.keys(attributes).length === (this.constructor.declares.length + Citrus.Action.alwaysDeclared.length))) {
        Ti.API.debug("Wrong amount of arguments passed to action constructor!");
      }
      this.valid = true;
      for (k in attributes) {
        if (!__hasProp.call(attributes, k)) continue;
        v = attributes[k];
        k = k.camelize(true);
        if (_.isFunction(this[k])) {
          this.valid = this.valid && this[k].call(v);
        } else {
          this[k] = v;
        }
      }
    }
    __extends(Action, Citrus.Object);
    Action.declares = [];
    Action.alwaysDeclared = ["actionText"];
    Action.prototype.valid = false;
    Action.prototype.icon = Citrus.getIconPath("generic");
    Action.prototype.actionText = "";
    Action.prototype.readyToRun = function() {
      return true;
    };
    Action.prototype.run = function(success, failure) {
      if (this.readyToRun()) {
        return this.action(success, failure);
      } else {
        return this.failure(null, "Not ready to run!");
      }
    };
    Action.prototype.action = function(success, failure) {
      return success();
    };
    Action.prototype.button = function() {
      return true;
    };
    Action.prototype.requiresAccount = function() {
      return false;
    };
    Action.prototype.requiresResponders = function() {
      return false;
    };
    return Action;
  }();
  Citrus.Action = Action;
  Ti.include("/app/models/actions/account_based_action.js");
  Ti.include("/app/models/actions/accountless_action.js");
  Ti.include("/app/models/actions/responder_action.js");
  _.extend(Citrus.Actions, {
    newFromJSON: function(passed_attributes) {
      var action, attributes, namespace, scope, type, types, _i, _len;
      attributes = _.clone(passed_attributes || {});
      type = attributes['_type'];
      delete attributes['id'];
      if (type) {
        delete attributes['_type'];
        types = type.split("::");
        scope = Citrus;
        for (_i = 0, _len = types.length; _i < _len; _i++) {
          namespace = types[_i];
          if (!_.isUndefined(scope[namespace])) {
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
  Ti.include("/app/models/actions/paypal/paypal_action.js");
  Ti.include("/app/models/actions/facebook/facebook_action.js");
  Ti.include("/app/models/actions/mailchimp/mailchimp_action.js");
}).call(this);

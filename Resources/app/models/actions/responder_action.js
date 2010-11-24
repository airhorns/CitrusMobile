(function() {
  var ResponderAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  ResponderAction = function() {
    function ResponderAction() {
      ResponderAction.__super__.constructor.apply(this, arguments);
    }
    __extends(ResponderAction, Citrus.Action);
    ResponderAction.prototype.requiresAccount = function() {
      return false;
    };
    ResponderAction.prototype.requiresResponders = function() {
      return true;
    };
    ResponderAction.prototype.respondWith = function(success, failure) {
      this.success = _.bind(success, this);
      return this.failure = _.bind(failure, this);
    };
    ResponderAction.prototype.action = function() {
      throw new Exception("Can't call action on a responder action, call the callbacks!");
    };
    return ResponderAction;
  }();
  Citrus.ResponderAction = ResponderAction;
}).call(this);

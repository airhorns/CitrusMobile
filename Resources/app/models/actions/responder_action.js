(function() {
  var ResponderAction;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  ResponderAction = function() {
    return Citrus.Action.apply(this, arguments);
  };
  __extends(ResponderAction, Citrus.Action);
  ResponderAction.prototype.requiresAccount = function() {
    return false;
  };
  ResponderAction.prototype.requiresResponders = function() {
    return true;
  };
  ResponderAction.prototype.respondWith = function(success, failure) {
    this.success = _.bind(success, this);
    return (this.failure = _.bind(failure, this));
  };
  ResponderAction.prototype.action = function() {
    throw new Exception("Can't call action on a responder action, call the callbacks!");
  };
  Citrus.ResponderAction = ResponderAction;
}).call(this);

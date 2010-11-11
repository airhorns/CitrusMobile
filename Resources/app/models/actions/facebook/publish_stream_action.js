(function() {
  var PublishStreamAction;
  var __bind = function(func, context) {
    return function(){ return func.apply(context, arguments); };
  }, __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  PublishStreamAction = function() {
    return Citrus.FacebookAction.apply(this, arguments);
  };
  __extends(PublishStreamAction, Citrus.FacebookAction);
  PublishStreamAction.declares = ["title", "data", "target"];
  PublishStreamAction.prototype.type = "FacebookPublishStreamAction";
  PublishStreamAction.prototype.buttonText = "Share";
  PublishStreamAction.prototype.action = function(account, success, failure) {
    return Titanium.Facebook.publishStream(this.title, this.data, this.target, __bind(function(e) {
      return e.success ? success(e) : failure(e);
    }, this));
  };
  Citrus.Actions.Facebook.PublishStreamAction = PublishStreamAction;
}).call(this);

(function() {
  var PublishStreamAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  PublishStreamAction = function() {
    function PublishStreamAction() {
      PublishStreamAction.__super__.constructor.apply(this, arguments);
    }
    __extends(PublishStreamAction, Citrus.FacebookAction);
    PublishStreamAction.declares = ["title", "data", "target"];
    PublishStreamAction.prototype.type = "FacebookPublishStreamAction";
    PublishStreamAction.prototype.buttonText = "Share";
    PublishStreamAction.prototype.action = function(account, success, failure) {
      return Titanium.Facebook.publishStream(this.title, this.data, this.target, __bind(function(e) {
        if (e.success) {
          return success(e);
        } else {
          return failure(e);
        }
      }, this));
    };
    return PublishStreamAction;
  }();
  Citrus.Actions.Facebook.PublishStreamAction = PublishStreamAction;
}).call(this);

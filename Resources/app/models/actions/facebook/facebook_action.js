(function() {
  var FacebookAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  FacebookAction = function() {
    function FacebookAction() {
      FacebookAction.__super__.constructor.apply(this, arguments);
    }
    __extends(FacebookAction, Citrus.AccountBasedAction);
    FacebookAction.declares = [];
    FacebookAction.prototype.type = "FacebookAction";
    FacebookAction.prototype.buttonText = "FacebookAction";
    FacebookAction.prototype.accountType = "FacebookAccount";
    FacebookAction.prototype.tableViewRow = "FacebookActionTableViewRow";
    return FacebookAction;
  }();
  Citrus.FacebookAction = FacebookAction;
  Ti.include("/app/models/actions/facebook/publish_stream_action.js");
}).call(this);

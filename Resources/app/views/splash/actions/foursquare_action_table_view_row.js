(function() {
  var TwitterActionTableViewRow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  TwitterActionTableViewRow = function() {
    return Citrus.ActionRows.ActionTableViewRow.apply(this, arguments);
  };
  __extends(TwitterActionTableViewRow, Citrus.ActionRows.ActionTableViewRow);
  TwitterActionTableViewRow.prototype.type = "TwitterActionTableViewRow";
  TwitterActionTableViewRow.prototype.buttonText = function() {
    return this.action.buttonText;
  };
  Citrus.registerActionViewRow(TwitterActionTableViewRow);
}).call(this);

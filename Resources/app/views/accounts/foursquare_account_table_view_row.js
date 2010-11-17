(function() {
  var FoursquareAccountTableViewRow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  FoursquareAccountTableViewRow = function(account) {
    var _ref, location, name;
    FoursquareAccountTableViewRow.__super__.constructor.apply(this, arguments);
    name = Ti.UI.createLabel({
      color: '#000',
      text: this.account.name,
      font: {
        fontSize: 20,
        fontWeight: 'bold'
      },
      top: 5,
      left: 70,
      height: 'auto',
      width: 'auto'
    });
    this.row.add(name);
    if (typeof (_ref = this.account.location) !== "undefined" && _ref !== null) {
      location = Ti.UI.createLabel({
        color: '#333',
        text: this.account.location,
        top: 30,
        left: 70,
        height: 20,
        width: 200
      });
      this.row.add(location);
    }
    return this;
  };
  __extends(FoursquareAccountTableViewRow, Citrus.AccountTableViewRow);
  Citrus.FoursquareAccountTableViewRow = FoursquareAccountTableViewRow;
}).call(this);

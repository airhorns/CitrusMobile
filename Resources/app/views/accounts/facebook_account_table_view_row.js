(function() {
  var FacebookAccountTableViewRow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  FacebookAccountTableViewRow = function(account) {
    var _ref, affils, name;
    FacebookAccountTableViewRow.__super__.constructor.apply(this, arguments);
    d(this.account.name);
    d(this.account.affiliations);
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
    if (typeof (_ref = this.account.affiliations) !== "undefined" && _ref !== null) {
      affils = Ti.UI.createLabel({
        color: '#333',
        text: this.account.affiliations,
        top: 30,
        left: 70,
        height: 20,
        width: 200
      });
      this.row.add(affils);
    }
    return this;
  };
  __extends(FacebookAccountTableViewRow, Citrus.AccountTableViewRow);
  Citrus.FacebookAccountTableViewRow = FacebookAccountTableViewRow;
}).call(this);

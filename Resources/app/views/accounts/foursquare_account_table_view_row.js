(function() {
  var FoursquareAccountTableViewRow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  FoursquareAccountTableViewRow = function() {
    function FoursquareAccountTableViewRow(account) {
      var location, name;
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
        minimumFontSize: 13,
        width: 240
      });
      this.row.add(name);
      if (this.account.location != null) {
        location = Ti.UI.createLabel({
          color: '#333',
          text: this.account.location,
          font: {
            fontSize: 15,
            fontWeight: 'bold'
          },
          minmumFontSize: 12,
          top: 30,
          left: 70,
          height: 20,
          width: 200
        });
        this.row.add(location);
      }
    }
    __extends(FoursquareAccountTableViewRow, Citrus.AccountTableViewRow);
    return FoursquareAccountTableViewRow;
  }();
  Citrus.FoursquareAccountTableViewRow = FoursquareAccountTableViewRow;
}).call(this);

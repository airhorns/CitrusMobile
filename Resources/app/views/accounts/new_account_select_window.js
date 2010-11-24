(function() {
  var NewAccountSelectWindow;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  NewAccountSelectWindow = function() {
    function NewAccountSelectWindow(controller, callback) {
      var data, item, klass, name, _i, _len, _ref, _results;
      Ti.API.debug("Creating select window");
      NewAccountSelectWindow.__super__.constructor.apply(this, arguments);
      this.win = Ti.UI.createWindow({
        title: "Add Account",
        backgroundColor: "#000000"
      });
      data = function() {
        _ref = Citrus.AccountTypes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          klass = _ref[_i];
          name = klass.prototype.type;
          item = Titanium.UI.createDashboardItem({
            image: Citrus.getIconPath(name),
            type: name,
            label: name.replace("Account", "")
          });
          _results.push(item);
        }
        return _results;
      }();
      this.dashboard = Titanium.UI.createDashboardView({
        data: data
      });
      this.dashboard.addEventListener('edit', __bind(function(e) {
        return this.dashboard.stopEditing();
      }, this));
      this.dashboard.addEventListener('click', __bind(function(e) {
        var type;
        if (e.item) {
          type = e.item.type;
          return callback.call(controller, type);
        }
      }, this));
      this.win.add(this.dashboard);
      Ti.API.debug("Done creating select window");
    }
    __extends(NewAccountSelectWindow, Citrus.GenericWindow);
    return NewAccountSelectWindow;
  }();
  Citrus.NewAccountSelectWindow = NewAccountSelectWindow;
}).call(this);

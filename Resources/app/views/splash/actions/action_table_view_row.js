(function() {
  var ActionTableViewRow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  ActionTableViewRow = function() {
    function ActionTableViewRow(action, takeable, clicked) {
      if (action == null) {
        return false;
      }
      this.action = action;
      this.clicked = clicked;
      this.takeable = takeable || false;
      this.row = this.getRowTemplate();
      this.state = Citrus.ActionTableViewRow.Ready;
      this.displayPhoto();
      this.displayText();
      this.displayButton();
    }
    __extends(ActionTableViewRow, Citrus.Object);
    ActionTableViewRow.InProgress = 1;
    ActionTableViewRow.Error = 2;
    ActionTableViewRow.Success = 3;
    ActionTableViewRow.Ready = 4;
    ActionTableViewRow.prototype.type = "ActionTableViewRow";
    ActionTableViewRow.prototype.getRowTemplate = function() {
      var row;
      row = Titanium.UI.createTableViewRow({
        height: 41,
        className: this.action.type + this.type,
        touchEnabled: false
      });
      row.object = this;
      return row;
    };
    ActionTableViewRow.prototype.displayButton = function(style, title) {
      var b, button, k, key, opts, shittyTI, _ref, _ref2;
      style != null ? style : style = Titanium.UI.iPhone.SystemButton.BORDERED;
      title != null ? title : title = _.isFunction(this.action.buttonText) ? this.action.buttonText() : this.action.buttonText;
      key = String(style) + "style" || "nostyle";
      (_ref = this.buttons) != null ? _ref : this.buttons = {};
      shittyTI = style === Titanium.UI.iPhone.SystemButton.SPINNER;
      if (this.buttons[key] == null) {
        opts = {
          right: 5,
          color: "#000",
          width: this.buttonWidth(),
          height: 25
        };
        if (!shittyTI) {
          if (style != null) {
            opts.style = style;
          }
        } else {
          opts.style = style;
          opts.enabled = true;
          opts.height = "auto";
          opts.width = "auto";
        }
        button = Ti.UI.createButton(opts);
        if (!shittyTI) {
          button.addEventListener("click", __bind(function(e) {
            if (_.isFunction(this.clicked)) {
              return this.clicked(this, e);
            } else {
              return Titanium.API.error("Clicked callback can't be run because it isn't a function!");
            }
          }, this));
        }
        this.buttons[key] = button;
        this.row.add(button);
      }
      _ref2 = this.buttons;
      for (k in _ref2) {
        if (!__hasProp.call(_ref2, k)) continue;
        b = _ref2[k];
        b.hide();
      }
      this.buttons[key].title = title;
      this.buttons[key].enabled = this.takeable;
      this.buttons[key].show();
      return true;
    };
    ActionTableViewRow.prototype.displayText = function() {
      var text;
      text = Ti.UI.createLabel({
        top: 2,
        left: this.textOffset(),
        color: '#000',
        text: this.text(),
        font: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        minimumFontSize: 12,
        width: 320 - 30 - this.textOffset() - this.buttonWidth()
      });
      return this.row.add(text);
    };
    ActionTableViewRow.prototype.displayPhoto = function() {
      var photo;
      photo = Ti.UI.createView({
        backgroundImage: this.icon(),
        top: 5,
        left: 5,
        height: 30,
        width: 30
      });
      return this.row.add(photo);
    };
    ActionTableViewRow.prototype.displayInProgress = function() {
      d("Trying to display progress");
      this.state = Citrus.ActionTableViewRow.InProgress;
      this.takeable = false;
      return this.displayButton(Titanium.UI.iPhone.SystemButton.ACTION, " ");
    };
    ActionTableViewRow.prototype.displaySuccess = function() {
      d("Trying to display success");
      this.state = Citrus.ActionTableViewRow.Success;
      this.takeable = false;
      this.displayButton(Titanium.UI.iPhone.SystemButton.PLAIN, "Done!");
      return d("Success displayed");
    };
    ActionTableViewRow.prototype.displayError = function(retry) {
      d("Trying to display error");
      retry != null ? retry : retry = true;
      this.state = Citrus.ActionTableViewRow.Error;
      this.takeable = retry;
      this.displayButton(null, retry ? "Retry?" : "Error!");
      return d("Error displayed");
    };
    ActionTableViewRow.prototype.icon = function() {
      return Citrus.getIconPath(this.action.accountType);
    };
    ActionTableViewRow.prototype.buttonText = function() {
      return "Run";
    };
    ActionTableViewRow.prototype.text = function() {
      return this.action.actionText;
    };
    ActionTableViewRow.prototype.textOffset = function() {
      return 42;
    };
    ActionTableViewRow.prototype.buttonWidth = function() {
      return 80;
    };
    return ActionTableViewRow;
  }();
  Citrus.ActionRows = {};
  Citrus.registerActionViewRow = function(klass) {
    return Citrus.ActionRows[klass.prototype.type] = klass;
  };
  Citrus.ActionTableViewRow = ActionTableViewRow;
  Citrus.registerActionViewRow(ActionTableViewRow);
}).call(this);

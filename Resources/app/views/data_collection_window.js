(function() {
  var DataCollectionWindow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  DataCollectionWindow = function() {
    function DataCollectionWindow(controller) {
      var field, name, opts, row, _ref, _ref2;
      DataCollectionWindow.__super__.constructor.apply(this, arguments);
      this.win = Ti.UI.createWindow({
        title: this.title,
        backgroundColor: '#fff',
        backButtonTitle: this.backButtonTitle || "Cancel"
      });
      _ref = [[], []], this.fields = _ref[0], this.rows = _ref[1];
      _ref2 = this.fieldsToCollect;
      for (name in _ref2) {
        if (!__hasProp.call(_ref2, name)) continue;
        opts = _ref2[name];
        row = this.getFieldRowTemplate();
        row.add(this.getFieldLabelTemplate(name.capitalize()));
        field = this.getFieldTemplate(_.extend(opts || {}, {
          name: name
        }));
        row.add(field);
        this.fields.push(field);
        this.rows.push(row);
      }
      this.table = Titanium.UI.createTableView({
        data: this.rows,
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        footerTitle: this.footerTitle || ""
      });
      this.win.add(this.table);
    }
    __extends(DataCollectionWindow, Citrus.GenericWindow);
    DataCollectionWindow.prototype.getFieldRowTemplate = function() {
      return Titanium.UI.createTableViewRow({
        height: 50,
        className: String(Math.random() * 10),
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
      });
    };
    DataCollectionWindow.prototype.getFieldLabelTemplate = function(text) {
      return Titanium.UI.createLabel({
        font: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        text: text,
        left: 10
      });
    };
    DataCollectionWindow.prototype.getFieldTemplate = function(opts) {
      opts = _.extend({
        height: 35,
        top: 8,
        left: 100,
        width: 195,
        color: '#336699',
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_NONE
      }, opts);
      return Titanium.UI.createTextField(opts);
    };
    DataCollectionWindow.prototype.data = function() {
      return _.inject(this.fields, function(memo, f) {
        memo[f.name] = f.value;
        return memo;
      }, {});
    };
    return DataCollectionWindow;
  }();
  Citrus.DataCollectionWindow = DataCollectionWindow;
}).call(this);

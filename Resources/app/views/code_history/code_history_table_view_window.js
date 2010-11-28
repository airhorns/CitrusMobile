(function() {
  var CodeHistoryTableViewWindow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  CodeHistoryTableViewWindow = function() {
    function CodeHistoryTableViewWindow() {
      CodeHistoryTableViewWindow.__super__.constructor.apply(this, arguments);
      this.loading = new Citrus.ModalLoadingView("Loading info...", this);
      this.win = Titanium.UI.createWindow({
        title: "Code History",
        backgroundColor: 'white'
      });
      this.table = Titanium.UI.createTableView({
        data: [],
        rowHeight: 60,
        editable: true
      });
      this.win.add(this.table);
    }
    __extends(CodeHistoryTableViewWindow, Citrus.GenericWindow);
    CodeHistoryTableViewWindow.prototype.showLoading = function() {
      return this.loading.show(this.win);
    };
    CodeHistoryTableViewWindow.prototype.hideLoading = function() {
      return this.loading.hide(this.win);
    };
    return CodeHistoryTableViewWindow;
  }();
  Citrus.CodeHistoryTableViewWindow = CodeHistoryTableViewWindow;
}).call(this);

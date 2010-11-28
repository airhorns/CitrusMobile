(function() {
  var CodeHistoryController;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Ti.include('/app/views/code_history/code_history_table_view_window.js');
  Ti.include('/app/models/splash_store.js');
  CodeHistoryController = function() {
    function CodeHistoryController() {
      d("Code history controller being created");
      this.window = new Citrus.CodeHistoryTableViewWindow(this);
      this.window.win.addEventListener("focus", __bind(function(e) {
        return this.focused(e);
      }, this));
    }
    __extends(CodeHistoryController, Citrus.Controller);
    CodeHistoryController.prototype.scans = [];
    CodeHistoryController.prototype.page = 0;
    CodeHistoryController.prototype.focused = function(e) {
      d("Code history being shown.");
      if (this.scans.length === 0) {
        return this.showNextPage();
      }
    };
    CodeHistoryController.prototype.showNextPage = function() {
      this.window.showLoading();
      return this.window.hideLoading();
    };
    return CodeHistoryController;
  }();
  Citrus.CodeHistoryController = CodeHistoryController;
}).call(this);

(function() {
  var CodeReaderController;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Ti.include('app/models/splash.js');
  Ti.include('app/views/code_reader/code_reader_window.js');
  Ti.include('app/controllers/splash_controller.js');
  CodeReaderController = function() {
    function CodeReaderController() {
      this.window = new Citrus.CodeReaderWindow(this, 'Scanner', 'Scan a code!');
    }
    __extends(CodeReaderController, Citrus.Controller);
    CodeReaderController.prototype.focused = function(e) {
      return this.attemptScan();
    };
    CodeReaderController.prototype.attemptScan = function() {
      return Titanium.TiBar.scan({
        configure: {
          classType: "ZBarReaderController",
          sourceType: "Album",
          cameraMode: "Default",
          symbol: {
            "QR-Code": true
          }
        },
        success: function(data) {
          if ((data != null ? data.barcode : void 0) != null) {
            Titanium.Media.vibrate();
            return new Citrus.SplashController(data.barcode, root.accountStore);
          }
        },
        cancel: function() {},
        error: function() {
          return alert("Error reading the code! Please try again.");
        }
      });
    };
    return CodeReaderController;
  }();
  Citrus.CodeReaderController = CodeReaderController;
}).call(this);

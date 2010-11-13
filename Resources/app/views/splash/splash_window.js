(function() {
  var SplashWindow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  Ti.include("/app/views/splash/splash_info_header_view.js");
  Ti.include("/app/views/splash/actions/action_table_view_row.js");
  Ti.include("/app/views/splash/actions/twitter_action_table_view_row.js");
  Ti.include("/app/views/splash/actions/paypal_action_table_view_row.js");
  Ti.include("/app/views/splash/actions/facebook_action_table_view_row.js");
  Ti.include("/app/views/splash/actions/platform_action_table_view_row.js");
  SplashWindow = function(controller) {
    var loadIndicator;
    SplashWindow.__super__.constructor.apply(this, arguments);
    this.win = Ti.UI.createWindow({
      title: "Scan Results",
      backgroundColor: '#fff'
    });
    this.loadingWindow = Ti.UI.createWindow({
      modal: true,
      opacity: 0.75,
      backgroundColor: 'black'
    });
    this.loadingIndicator = Ti.UI.createView({
      backgroundColor: 'black',
      opacity: 0.75,
      height: 70,
      width: 70,
      left: 125,
      top: 280
    });
    loadIndicator = Ti.UI.createActivityIndicator({
      style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
      message: 'loading data...',
      font: 'Arial',
      color: '#FFF'
    });
    this.loadingIndicator.add(loadIndicator);
    this.loadingWindow.add(this.loadingIndicator);
    this.loadingShown = false;
    return this;
  };
  __extends(SplashWindow, Citrus.GenericWindow);
  SplashWindow.prototype.displaySplash = function(splash) {
    var _ref, rows;
    Ti.API.debug("Displaying splash \"" + splash.name + "\", tid:" + splash.tid);
    this.hideError();
    this.splash = splash;
    if (typeof (_ref = this.table) !== "undefined" && _ref !== null) {
      this.win.remove(this.table);
    }
    rows = this.getActionRows();
    this.table = Titanium.UI.createTableView({
      data: rows,
      editable: false,
      allowsSelection: false,
      style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
      headerView: this.getHeaderView()
    });
    this.win.add(this.table);
    this.hideLoading();
    return d("Table added");
  };
  SplashWindow.prototype.displayError = function(msg, retry, callback) {
    var _ref;
    this.hideLoading();
    if (!(typeof (_ref = this.errorLabel) !== "undefined" && _ref !== null)) {
      this.errorLabel = Ti.UI.createLabel({
        color: '#000',
        font: {
          fontSize: 20,
          fontWeight: 'bold'
        },
        top: 100,
        height: 'auto',
        width: 300
      });
      this.win.add(this.errorLabel);
    }
    this.errorLabel.text = msg;
    this.errorLabel.show();
    if (retry) {
      if (!(typeof (_ref = this.retryButton) !== "undefined" && _ref !== null)) {
        this.retryButton = Titanium.UI.createButton({
          title: "Retry",
          color: '#fff',
          backgroundImage: 'images/buttons/BUTT_grn_off.png',
          backgroundSelectedImage: 'images/buttons/BUTT_grn_on.png',
          backgroundDisabledImage: 'images/buttons/BUTT_drk_off.png',
          font: {
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'Helvetica Neue'
          },
          top: 200,
          width: 301,
          height: 57
        });
        this.retryButton.addEventListener("click", function(e) {
          return callback(e);
        });
        this.win.add(this.retryButton);
      }
      return this.retryButton.show();
    }
  };
  SplashWindow.prototype.displayDecodedData = function(data) {
    var _ref;
    if (!(typeof (_ref = this.noticeLabel) !== "undefined" && _ref !== null)) {
      this.noticeLabel = Ti.UI.createLabel({
        color: '#000',
        font: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        top: 50,
        height: 'auto',
        width: 300,
        text: "Warning: this code doesn't seem to be a Citrus enabled code! Here's the data that was in it:"
      });
      this.win.add(this.noticeLabel);
    }
    if (!(typeof (_ref = this.dataView) !== "undefined" && _ref !== null)) {
      this.dataView = Ti.UI.createWebView({
        color: '#000',
        top: 150,
        height: 300,
        width: 300,
        html: sc.helpers.makeClickable(data, {
          autolink: true,
          screenname: true
        })
      });
      this.win.add(this.dataView);
    }
    this.noticeLabel.show();
    this.dataView.show();
    return this.hideLoading();
  };
  SplashWindow.prototype.hideError = function() {
    var _ref;
    if (typeof (_ref = this.errorLabel) !== "undefined" && _ref !== null) {
      this.win.remove(this.errorLabel);
    }
    if (typeof (_ref = this.noticeLabel) !== "undefined" && _ref !== null) {
      this.win.remove(this.noticeLabel);
    }
    if (typeof (_ref = this.dataView) !== "undefined" && _ref !== null) {
      this.win.remove(this.dataView);
    }
    if (typeof (_ref = this.goButton) !== "undefined" && _ref !== null) {
      this.win.remove(this.goButton);
    }
    if (typeof (_ref = this.retryButton) !== "undefined" && _ref !== null) {
      return this.win.remove(this.retryButton);
    }
  };
  SplashWindow.prototype.getHeaderView = function() {
    var view;
    view = new Citrus.SplashInfoHeaderView(this.splash);
    return view.view;
  };
  SplashWindow.prototype.getActionRows = function() {
    var _i, _len, _ref, _result, action, callback, klass, row, rows, takeable;
    rows = (function() {
      _result = []; _ref = this.splash.actions;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        action = _ref[_i];
        _result.push((function() {
          takeable = this.controller.isActionTakeable(action);
          callback = this.controller.takeActionFromRow;
          klass = Citrus.ActionRows[action.tableViewRow];
          if (typeof klass !== "undefined" && klass !== null) {
            row = new klass(action, takeable, callback);
          } else {
            Ti.API.debug("Warning: couldn't find table view row class " + action.tableViewRow + ". Instantiating generic.");
            row = new Citrus.ActionRows.ActionTableViewRow(action, takeable, callback);
          }
          return row.row;
        }).call(this));
      }
      return _result;
    }).call(this);
    return rows;
  };
  SplashWindow.prototype.showLoading = function() {
    d("Showing loading indicator");
    if (!(this.loadingShown)) {
      return this.loadingWindow.open({
        animated: false
      });
    }
  };
  SplashWindow.prototype.hideLoading = function() {
    d("Hiding loading indicator");
    if (this.loadingShown) {
      return this.loadingWindow.close({
        animated: false
      });
    }
  };
  Citrus.SplashWindow = SplashWindow;
}).call(this);

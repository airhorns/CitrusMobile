(function() {
  var SplashWindow;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Ti.include("/app/views/modal_loading_view.js");
  Ti.include("/app/views/splash/splash_info_header_view.js");
  Ti.include("/app/views/splash/actions/action_table_view_row.js");
  Ti.include("/app/views/splash/actions/account_action_table_view_row.js");
  Ti.include("/app/views/splash/actions/twitter_action_table_view_row.js");
  Ti.include("/app/views/splash/actions/paypal_action_table_view_row.js");
  Ti.include("/app/views/splash/actions/facebook_action_table_view_row.js");
  Ti.include("/app/views/splash/actions/platform_action_table_view_row.js");
  Ti.include("/app/helpers/redirect_helper.js");
  SplashWindow = function() {
    function SplashWindow(controller) {
      SplashWindow.__super__.constructor.apply(this, arguments);
      this.win = Ti.UI.createWindow({
        title: "Scan Results",
        backgroundColor: '#fff'
      });
      this.loading = new Citrus.ModalLoadingView("Loading info...", this);
    }
    __extends(SplashWindow, Citrus.GenericWindow);
    SplashWindow.prototype.displaySplash = function(splash) {
      var rows;
      Ti.API.debug("Displaying splash \"" + splash.name + "\", tid:" + splash.tid);
      this.hideError();
      this.splash = splash;
      if (this.table != null) {
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
      this.hideLoading();
      if (this.errorLabel == null) {
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
        if (this.retryButton == null) {
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
      var html;
      if (this.noticeLabel == null) {
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
      if (this.dataView == null) {
        this.dataView = Ti.UI.createWebView({
          color: '#000',
          top: 150,
          height: 300,
          width: 300,
          url: 'app/views/splash/local_webview.html'
        });
        this.dataView.addEventListener("load", __bind(function(e) {
          var link;
          link = Citrus.redirectableLink(e.url);
          if (link) {
            d("Opening redirected link " + link);
            return Titanium.Platform.openURL(link);
          }
        }, this));
        this.win.add(this.dataView);
      }
      html = Citrus.redirectifyLinks(sc.helpers.makeClickable(data, {
        autolink: true,
        screenname: true
      }));
      this.dataView.html = html;
      this.noticeLabel.show();
      this.dataView.show();
      return this.hideLoading();
    };
    SplashWindow.prototype.hideError = function() {
      if (this.errorLabel != null) {
        this.win.remove(this.errorLabel);
      }
      if (this.noticeLabel != null) {
        this.win.remove(this.noticeLabel);
      }
      if (this.dataView != null) {
        this.win.remove(this.dataView);
      }
      if (this.goButton != null) {
        this.win.remove(this.goButton);
      }
      if (this.retryButton != null) {
        return this.win.remove(this.retryButton);
      }
    };
    SplashWindow.prototype.getHeaderView = function() {
      var view;
      view = new Citrus.SplashInfoHeaderView(this.splash);
      return view.view;
    };
    SplashWindow.prototype.getActionRows = function() {
      var action, callback, klass, row, rows, takeable, _i, _len, _ref, _results;
      rows = function() {
        _ref = this.splash.actions;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          action = _ref[_i];
          takeable = this.controller.isActionTakeable(action);
          callback = this.controller.takeActionFromRow;
          klass = Citrus.ActionRows[action.tableViewRow];
          if (klass != null) {
            row = new klass(action, takeable, callback);
          } else {
            Ti.API.debug("Warning: couldn't find table view row class " + action.tableViewRow + ". Instantiating generic.");
            row = new Citrus.ActionRows.ActionTableViewRow(action, takeable, callback);
          }
          _results.push(row.row);
        }
        return _results;
      }.call(this);
      return rows;
    };
    SplashWindow.prototype.showLoading = function() {
      return this.loading.show(this.win);
    };
    SplashWindow.prototype.hideLoading = function() {
      return this.loading.hide(this.win);
    };
    return SplashWindow;
  }();
  Citrus.SplashWindow = SplashWindow;
}).call(this);

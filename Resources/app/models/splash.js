(function() {
  var Splash;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Ti.include("/app/models/actions/action.js");
  Splash = function() {
    function Splash(attributes) {
      var k, v;
      Splash.__super__.constructor.call(this);
      this.actions = [];
      for (k in attributes) {
        if (!__hasProp.call(attributes, k)) continue;
        v = attributes[k];
        if (_.isFunction(this[k])) {
          this[k].call(v);
        } else if (k === "actions") {
          this.setActions(v);
        } else {
          this[k] = v;
        }
      }
    }
    __extends(Splash, Citrus.Object);
    Splash.shortcodeRE = new RegExp(Citrus.Config.SHORTCODE_RE);
    Splash.backendURL = new RegExp(Citrus.Config.REMOTE_URL + Citrus.Config.SHORTENER_PREFIX);
    Splash.newFromDecodedData = function(data, success, error) {
      var matches, shortcode;
      matches = this.shortcodeRE.exec(data);
      if (this.backendURL.test(data) && (matches != null) && matches.length > 1) {
        shortcode = matches[1];
        data.replace(/\.(html|xml|json)/, ".json");
        if (!data.match(".json")) {
          data += ".json";
        }
        return Titanium.ajax({
          url: data,
          dataType: "json",
          success: function(attributes, status, xhr) {
            var splash;
            Ti.API.debug("Success fetching splash!");
            attributes.shortcode = shortcode;
            splash = new Citrus.Splash(attributes);
            if (_.isFunction(success)) {
              return success(splash);
            }
          },
          error: function(xhr, status, e) {
            Ti.API.error("Error retrieving splash data. Status:" + status + ", code:" + xhr.status);
            return error(xhr, status, e);
          }
        });
      } else {
        error(false, "not_citrus_code");
        return false;
      }
    };
    Splash.prototype.name = "";
    Splash.prototype.description = "";
    Splash.prototype.photo = "";
    Splash.prototype.text = "";
    Splash.prototype.shortcode = "";
    Splash.prototype.setActions = function(passed_actions) {
      var action, attrs, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = passed_actions.length; _i < _len; _i++) {
        attrs = passed_actions[_i];
        action = Citrus.Actions.newFromJSON(attrs);
        _results.push(action !== false ? this.actions.push(action) : (Ti.API.error("Invalid/Unknown action! Attributes were:"), Ti.API.debug(attrs)));
      }
      return _results;
    };
    return Splash;
  }();
  Citrus.Splash = Splash;
}).call(this);

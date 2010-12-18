(function() {
  var SplashStore;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  SplashStore = function() {
    function SplashStore() {
      var name, names, result, tables, _i, _len;
      return;
      this.db = Titanium.Database.open("citrus");
      root.addEventListener("splash:found", __bind(function(splash) {
        return this.addSplash(splash);
      }, this));
      if (true) {
        names = [];
        tables = this.db.execute("SELECT name from sqlite_master WHERE type='table';");
        while (tables.isValidRow()) {
          names.push(tables.fieldByName('name'));
          tables.next();
        }
        tables.close();
        for (_i = 0, _len = names.length; _i < _len; _i++) {
          name = names[_i];
          result = this.db.execute("DROP TABLE IF EXISTS " + name);
        }
        this.db.execute("CREATE TABLE splashes IF NOT EXISTS (id INTEGER PRIMARY KEY,         code STRING NOT NULL, name STRING NOT NULL, data TEXT NOT NULL)");
      }
    }
    __extends(SplashStore, Citrus.Object);
    SplashStore.prototype.addSplash = function(data) {
      var existing, save;
      return;
      if (data.persistable != null) {
        save = data.persistable();
      } else {
        save = data;
      }
      save = JSON.stringify(data);
      existing = this.db.existing("SELECT id FROM splashes WHERE code = '?'", data.shortcode);
      if (existing.isValidRow()) {
        return this.db.execute("UPDATE splashes SET name = ?, data = ? WHERE id = ?", data.name, save, existing.fieldByName('id'));
      } else {
        return this.db.execute("INSERT INTO splashes (code, name, data) VALUES (?, ?, ?)", data.shortcode, data.name, save);
      }
    };
    SplashStore.prototype.getSplashes = function(offset, limit, callback) {
      var s, splashCursor, _results;
      splashCursor = this.db.execute("SELECT * FROM splashes LIMIT ? OFFSET ?");
      try {
        _results = [];
        while (splashCursor.isValidRow()) {
          s = JSON.parse(splashCursor.fieldByName('data'));
          callback(null, s);
          _results.push(splashCursor.next());
        }
        return _results;
      } catch (e) {
        er("Error getting Splash JSON", splashCursor.fieldByName('data'));
        return callback(e, null);
      } finally {
        splashCursor.close();
      }
    };
    return SplashStore;
  }();
  Citrus.SplashStore = SplashStore;
}).call(this);

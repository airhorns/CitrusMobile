(function() {
  var SplashStore;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  SplashStore = function() {
    function SplashStore() {
      var names;
      return;
      this.db = Titanium.Database.open("citrus");
      if (true) {
        names = [];
        while (tables.isValidRow()) {
          names.push(tables.fieldByName('name'));
          tables.next();
        }
        tables.close();
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

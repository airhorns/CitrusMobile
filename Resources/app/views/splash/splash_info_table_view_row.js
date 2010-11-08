(function() {
  var SplashInfoTableViewRow;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  SplashInfoTableViewRow = function(splash) {
    var _ref, description, photo, text_offset, title;
    this.row = Titanium.UI.createTableViewRow({
      className: "codeInfoRow",
      height: "auto"
    });
    this.splash = splash;
    this.row.object = this;
    if (typeof (_ref = splash.photo) !== "undefined" && _ref !== null) {
      text_offset = 74;
      photo = Ti.UI.createImageView({
        image: splash.photo,
        height: 60,
        width: 60,
        top: 4,
        left: 7
      });
      this.row.add(photo);
    } else {
      text_offset = 5;
    }
    title = Ti.UI.createLabel({
      color: '#000',
      text: splash.name,
      font: {
        fontSize: 30,
        fontWeight: 'bold'
      },
      top: 4,
      left: text_offset,
      height: 'auto',
      width: 'auto'
    });
    this.row.add(title);
    description = Ti.UI.createLabel({
      color: '#000',
      text: splash.text,
      font: {
        fontSize: 20,
        fontWeight: 'bold'
      },
      top: 40,
      left: text_offset,
      height: 'auto',
      width: 'auto'
    });
    this.row.add(description);
    return this;
  };
  __extends(SplashInfoTableViewRow, Citrus.Object);
  Citrus.SplashInfoTableViewRow = SplashInfoTableViewRow;
}).call(this);

(function() {
  var SplashInfoHeaderView;
  var __extends = function(child, parent) {
    var ctor = function(){};
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.prototype.constructor = child;
    if (typeof parent.extended === "function") parent.extended(child);
    child.__super__ = parent.prototype;
  };
  SplashInfoHeaderView = function(splash) {
    var _ref, description, photo, text_offset, title;
    this.view = Titanium.UI.createView({
      height: 65,
      top: 0
    });
    this.splash = splash;
    this.view.object = this;
    if (typeof (_ref = splash.photo) !== "undefined" && _ref !== null) {
      text_offset = 74;
      photo = Ti.UI.createImageView({
        image: splash.photo,
        width: 60,
        height: 'auto',
        top: 6,
        left: 7,
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 1
      });
      this.view.add(photo);
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
      minimumFontSize: 16,
      top: 4,
      left: text_offset,
      height: 32,
      width: (320 - text_offset - 4),
      shadowColor: '#999',
      shadowOffset: {
        x: 1,
        y: 1
      }
    });
    this.view.add(title);
    description = Ti.UI.createLabel({
      color: '#000',
      text: splash.text,
      font: {
        fontSize: 20,
        fontWeight: 'bold'
      },
      minimumFontSize: 12,
      top: 40,
      left: text_offset,
      height: 22,
      width: (320 - text_offset - 4)
    });
    this.view.add(description);
    return this;
  };
  __extends(SplashInfoHeaderView, Citrus.Object);
  Citrus.SplashInfoHeaderView = SplashInfoHeaderView;
}).call(this);

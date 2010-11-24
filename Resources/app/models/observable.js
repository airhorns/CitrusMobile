(function() {
  var Event, EventSubscription, Observable;
  Observable = function() {
    function Observable() {}
    Observable.prototype.addEventListener = function(name, callback, scope) {
      var _base, _ref, _ref2;
      (_ref = this.eventsObserved) != null ? _ref : this.eventsObserved = {};
      (_ref2 = (_base = this.eventsObserved)[name]) != null ? _ref2 : _base[name] = new Observable.Event(name);
      this.eventsObserved[name].addListener({
        callback: callback,
        scope: scope
      });
      return new EventSubscription(this, name, callback, scope);
    };
    Observable.prototype.removeEventListener = function(name, callback, scope) {
      var _ref;
      (_ref = this.eventsObserved) != null ? _ref : this.eventsObserved = {};
      if (this.eventsObserved[name]) {
        this.eventsObserved[name].removeListener(callback, scope);
        if (!this.eventsObserved[name].hasListeners()) {
          return delete this.eventsObserved[name];
        }
      }
    };
    Observable.prototype.fireEvent = function(name, eventObject) {
      var _ref;
      Titanium.API.debug("fireEvent#" + name);
      (_ref = this.eventsObserved) != null ? _ref : this.eventsObserved = {};
      if (this.eventsObserved[name]) {
        return this.eventsObserved[name].fire(eventObject);
      }
    };
    return Observable;
  }();
  Event = function() {
    function Event(name) {
      this.name = name;
      this.listeners = [];
      this.firing = false;
    }
    Event.prototype.fire = function(eventObject) {
      var listener, _i, _len, _ref, _results;
      if (this.listeners.length === 0) {
        return;
      }
      try {
        this.firing = true;
        _ref = this.listeners;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          listener = _ref[_i];
          _results.push(listener.callback.call(listener.scope || this, eventObject));
        }
        return _results;
      } finally {
        this.firing = false;
      }
    };
    Event.prototype.addListener = function(config) {
      return this.listeners.push(config);
    };
    Event.prototype.removeListener = function(callback, scope) {
      var listener, listenerToErase, _i, _len, _ref;
      listenerToErase = null;
      _ref = this.listeners;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        listener = _ref[_i];
        if (listener.callback === callback && listener.scope === scope) {
          listenerToErase = listener;
          return false;
        }
      }
      if (listenerToErase !== null) {
        return this.listeners.erase(listenerToErase);
      }
    };
    Event.prototype.hasListeners = function() {
      return this.listeners.length !== 0;
    };
    return Event;
  }();
  Observable.Event = Event;
  EventSubscription = function() {
    function EventSubscription(target, name, callback, scope) {
      this.target = target;
      this.name = name;
      this.callback = callback;
      this.scope = scope;
    }
    EventSubscription.prototype.destroy = function() {
      this.target.removeEventListener(this.name, this.callback, this.scope);
      this.target = null;
      this.callback = null;
      return this.scope = null;
    };
    return EventSubscription;
  }();
  Citrus.Observable = Observable;
  Citrus.EventSubscription = EventSubscription;
  Citrus.Event = Event;
}).call(this);

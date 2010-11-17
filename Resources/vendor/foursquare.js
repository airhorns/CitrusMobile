(function() {
  var FoursquareAPI;
  FoursquareAPI = function() {};
  FoursquareAPI.baseURL = 'http://api.foursquare.com/v1/';
  FoursquareAPI.urlMap = {
    user: FoursquareAPI.baseURL + 'user',
    checkIn: FoursquareAPI.baseURL + 'checkin',
    sendFriendRequest: FoursquareAPI.baseURL + 'friend/sendrequest'
  };
  FoursquareAPI.prototype.me = {
    firstname: "",
    lastname: "",
    gender: "",
    phone: ""
  };
  FoursquareAPI.prototype.getDetails = function(uid, success, failure) {
    var options;
    options = {
      type: 'GET',
      url: this._getURL('user'),
      success: function(data, status, xhr) {
        this.me = data.user;
        if (typeof success !== "undefined" && success !== null) {
          return success(data, status, xhr);
        }
      },
      failure: failure,
      data: {}
    };
    if (typeof uid !== "undefined" && uid !== null) {
      options.data.uid = uid;
    }
    return this._callMethod(options);
  };
  FoursquareAPI.prototype.checkIn = function(vid, success, failure) {
    var options;
    options = {
      type: 'POST',
      url: this._getURL('checkIn'),
      success: success,
      failure: failure,
      data: {
        vid: vid
      }
    };
    return this._callMethod(options);
  };
  FoursquareAPI.prototype.sendFriendRequest = function(uid, success, failure) {
    var options;
    if (!(typeof uid !== "undefined" && uid !== null)) {
      er("Trying to add a friend without passing a UID!");
      failure({});
      return false;
    }
    options = {
      type: 'POST',
      url: this._getURL('sendFriendRequest'),
      success: success,
      failure: failure,
      data: {
        uid: uid
      }
    };
    return this._callMethod(options);
  };
  FoursquareAPI.prototype._getURL = function(key) {
    var url;
    d(this.constructor);
    url = this.constructor.urlMap[key];
    if (typeof url !== "undefined" && url !== null) {
      return url + ".json";
    }
    throw {
      type: "ArgumentError",
      message: "Nonexistant key " + key + " for the foursquare api url map."
    };
  };
  FoursquareAPI.prototype._callMethod = function(options) {
    var _ref, consumer, oldError, oldSuccess, that;
    if (!((typeof (_ref = this.consumer) !== "undefined" && _ref !== null) && this.consumer.isAuthorized())) {
      e("Trying to run foursquare api without an authorized consumer!");
      if (typeof (_ref = options.failure) !== "undefined" && _ref !== null) {
        options.failure();
      }
      return false;
    }
    consumer = this.consumer;
    options = _.extend({
      type: 'GET',
      dataType: 'json',
      beforeSend: function(xhr) {
        var auth_header;
        auth_header = consumer.getAuthHeader({
          method: options.type,
          url: options.url,
          parameters: options.data
        });
        d("Signing with " + auth_header);
        return xhr.setRequestHeader('Authorization', auth_header);
      }
    }, options);
    oldSuccess = options.success;
    oldError = options.error;
    that = this;
    options.success = function(data, status, xhr) {
      d("Success talking to foursquare api", data);
      if (typeof oldSuccess !== "undefined" && oldSuccess !== null) {
        return oldSuccess.call(that, data, status, xhr);
      }
    };
    options.error = function(xhr, status, error) {
      e("Error contacting Foursquare!");
      e(error, status, xhr);
      if (typeof oldError !== "undefined" && oldError !== null) {
        return oldErrror.call(that, data, status, xhr);
      }
    };
    d(options);
    return Titanium.ajax(options);
  };
  Citrus.FoursquareAPI = FoursquareAPI;
}).call(this);

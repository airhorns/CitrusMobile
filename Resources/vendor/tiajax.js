(function() {
  var defaultAjaxSettings, jsre, r20, rquery, rts, rurl;
  var __hasProp = Object.prototype.hasOwnProperty;
  defaultAjaxSettings = {
    global: true,
    type: "GET",
    contentType: "application/x-www-form-urlencoded",
    processData: true,
    async: true,
    timeout: 300000,
    traditional: false,
    xhr: function() {
      return Ti.Network.createHTTPClient();
    },
    accepts: {
      xml: "application/xml, text/xml",
      html: "text/html",
      script: "text/javascript, application/javascript",
      json: "application/json, text/javascript",
      text: "text/plain",
      _default: "*/*"
    }
  };
  jsre = /=\?(&|$)/;
  rquery = /\?/;
  rts = /(\?|&)_=.*?(&|$)/;
  rurl = /^(\w+:)?\/\/([^\/?#]+)/;
  r20 = /%20/g;
  _.extend(Titanium.Network, {
    param: function(a) {
      var add, buildParams, obj, prefix, s, traditional;
      s = [];
      traditional = false;
      buildParams = function(prefix, obj) {
        if (_.isArray(obj)) {
          return _.each(obj, function(i, v) {
            var p, x;
            if (traditional || /\[\]$/.test(prefix)) {
              return add(prefix, v);
            } else {
              x = _.isObject(v) || _.isArray(v) ? i : "";
              p = prefix + "[" + x + "]";
              return buildParams(p, v);
            }
          });
        } else if (!traditional && !_.isNull(obj) && typeof obj === "object") {
          return _.each(obj, function(k, v) {
            return buildParams(prefix + "[" + k + "]", v);
          });
        } else {
          return add(prefix, obj);
        }
      };
      add = function(key, value) {
        value = _.isFunction(value) ? value() : value;
        return s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
      };
      if (_.isArray(a)) {
        _.each(a, function() {
          return add(this.name, this.value);
        });
      } else {
        for (prefix in a) {
          if (!__hasProp.call(a, prefix)) continue;
          obj = a[prefix];
          buildParams(prefix, obj);
        }
      }
      return s.join("&").replace(r20, "+");
    },
    lastModified: {},
    etag: {},
    httpSuccess: function(xhr) {
      try {
        return (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304;
      } catch (e) {

      }
      return false;
    },
    httpNotModified: function(xhr, url) {
      var etag, lastModified;
      lastModified = xhr.getResponseHeader("Last-Modified");
      etag = xhr.getResponseHeader("Etag");
      if (lastModified) {
        Titanium.Network.lastModified[url] = lastModified;
      }
      if (etag) {
        Titanium.Network.etag[url] = etag;
      }
      return xhr.status === 304 || xhr.status === 0;
    },
    httpData: function(xhr, type, s) {
      var ct, data, xml;
      ct = xhr.getResponseHeader("content-type") || "";
      xml = type === "xml" || !type && ct.indexOf("xml") >= 0;
      data = xml ? xhr.responseXML : xhr.responseText;
      if (xml && data.documentElement.nodeName === "parsererror") {
        Titanium.Network.error("parsererror");
      }
      if ((s != null) && s.dataFilter) {
        data = s.dataFilter(data, type);
      }
      if (typeof data === "string") {
        if (type === "json" || !type && ct.indexOf("json") >= 0) {
          data = JSON.parse(data);
        }
      }
      return data;
    },
    error: function(msg) {
      throw msg;
    },
    handleError: function(s, xhr, status, e) {
      if (s.error) {
        return s.error.call(s.context || s, xhr, status, e);
      }
    },
    ajax: function(origSettings) {
      var callbackContext, complete, data, oldAbort, onreadystatechange, parts, remote, requestDone, ret, s, status, success, ts, type, xhr, _ref;
      s = _.extend({}, defaultAjaxSettings, origSettings);
      status = "";
      data = {};
      callbackContext = origSettings && origSettings.context || s;
      type = s.type.toUpperCase();
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = Titanium.Network.param(s.data, s.traditional);
      }
      if (s.cache === false && type === "GET") {
        ts = (new Date).getTime();
        ret = s.url.replace(rts, "$1_=" + ts + "$2");
        s.url = ret + (ret === s.url ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
      }
      if (s.data && type === "GET") {
        s.url += ((_ref = rquery.test(s.url)) != null ? _ref : {
          "&": "?"
        }) + s.data;
      }
      parts = rurl.exec(s.url);
      remote = true;
      requestDone = false;
      xhr = s.xhr();
      if (!xhr) {
        return;
      }
      Ti.API.debug("Sending " + type + " request to " + s.url);
      if (type === "POST") {
        Ti.API.debug("POSTing data:");
        Ti.API.debug(s.data);
      }
      if (s.username != null) {
        xhr.open(type, s.url, s.async, s.username, s.password);
      } else {
        xhr.open(type, s.url, s.async);
      }
      if (s.data || origSettings && origSettings.contentType) {
        xhr.setRequestHeader("Content-Type", s.contentType);
      }
      if (s.ifModified) {
        if (Titanium.Network.lastModified[s.url]) {
          xhr.setRequestHeader("If-Modified-Since", Titanium.Network.lastModified[s.url]);
        }
        if (Titanium.Network.etag[s.url]) {
          xhr.setRequestHeader("If-None-Match", Titanium.Network.etag[s.url]);
        }
      }
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      xhr.setRequestHeader("Accept", s.dataType && s.accepts[s.dataType] ? s.accepts[s.dataType] + ", */*" : s.accepts._default);
      if (s.beforeSend && s.beforeSend.call(callbackContext, xhr, s) === false) {
        xhr.abort();
        return false;
      }
      onreadystatechange = xhr.onreadystatechange = function(isTimeout) {
        var errMsg;
        if (!xhr || xhr.readyState === 0 || isTimeout === "abort") {
          if (!requestDone) {
            complete();
          }
          requestDone = true;
          if (xhr) {
            return xhr.onreadystatechange = function() {};
          }
        } else if (!requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout")) {
          requestDone = true;
          xhr.onreadystatechange = function() {};
          status = isTimeout === "timeout" ? "timeout" : !Titanium.Network.httpSuccess(xhr) ? "error" : s.ifModified && Titanium.Network.httpNotModified(xhr, s.url) ? "notmodified" : "success";
          errMsg = "";
          if (status === "success") {
            try {
              data = Titanium.Network.httpData(xhr, s.dataType, s);
            } catch (err) {
              status = "parsererror";
              errMsg = err;
            }
          }
          if (status === "success" || status === "notmodified") {
            success();
          } else {
            Titanium.Network.handleError(s, xhr, status, errMsg);
          }
          complete();
          if (isTimeout === "timeout") {
            xhr.abort();
          }
          if (s.async) {
            return xhr = null;
          }
        }
      };
      try {
        oldAbort = xhr.abort;
        xhr.abort = function() {
          if (xhr) {
            oldAbort.call(xhr);
          }
          return onreadystatechange("abort");
        };
      } catch (e) {

      }
      if (s.async && s.timeout > 0) {
        setTimeout(function() {
          if (xhr && !requestDone) {
            return onreadystatechange("timeout");
          }
        }, s.timeout);
      }
      try {
        xhr.send(type === "POST" || type === "PUT" || type === "DELETE" ? s.data : null);
      } catch (e) {
        Titanium.Network.handleError(s, xhr, null, e);
        complete();
      }
      success = function() {
        if (s.success) {
          return s.success.call(callbackContext, data, status, xhr);
        }
      };
      complete = function() {
        if (s.complete) {
          return s.complete.call(callbackContext, xhr, status);
        }
      };
      return xhr;
    }
  });
  Titanium.ajax = Titanium.Network.ajax;
}).call(this);

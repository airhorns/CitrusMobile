(function() {
  _.extend(Citrus, {
    redirectifyLinks: function(str) {
      return str.replace(/href="(.+?)"/, 'href="citrus_redirect.html?to=$1"');
    },
    redirectableLink: function(str) {
      var matches;
      matches = str.match(/citrus_redirect.html\?to=(.+?)$/);
      if ((typeof matches !== "undefined" && matches !== null) && matches) {
        return matches[1];
      } else {
        return false;
      }
    }
  });
}).call(this);

(function() {
  var SubscribeAction;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  SubscribeAction = function() {
    function SubscribeAction() {
      SubscribeAction.__super__.constructor.apply(this, arguments);
    }
    __extends(SubscribeAction, Citrus.MailchimpAction);
    SubscribeAction.prototype.type = "MailchimpSubscribeAction";
    SubscribeAction.prototype.buttonText = "Subscribe";
    SubscribeAction.declares = ["apiKey", "listId"];
    SubscribeAction.prototype.action = function(account, success, failure) {
      return Titanium.ajax({
        url: this.baseURL + "?output=json&method=listSubscribe",
        type: "POST",
        dataType: "json",
        data: {
          apikey: this.apiKey,
          email_address: account.email,
          id: this.listId,
          merge_vars: {
            OPTINIP: Titanium.Platform.address
          }
        },
        success: function(data, status, xhr) {
          if (data.error != null) {
            e("Error subscribing to list!");
            return failure(xhr, status, data);
          } else {
            d("Success subscribing", data, "Status:", status, "Code", xhr.status, "Response", xhr.responseText);
            return success(data);
          }
        },
        error: failure
      });
    };
    return SubscribeAction;
  }();
  Citrus.Actions.Mailchimp.SubscribeAction = SubscribeAction;
}).call(this);

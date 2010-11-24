class SubscribeAction extends Citrus.MailchimpAction
	type: "MailchimpSubscribeAction"
	buttonText: "Subscribe"
	@declares: ["apiKey", "listId"]

	action: (account, success, failure) ->
		#Titanium.ajax
			#url: @baseURL + "?output=json&method=lists"
			#type: "POST"
			#dataType: "json"
			#data:
				#apikey: @apiKey
			#success: (data, status, xhr) ->
				#d("Valid lists for this api key: ", data)
			#error: (xhr, status, error) ->
				#er("error fetching lists!", xhr, status, error)

		Titanium.ajax
			url: @baseURL + "?output=json&method=listSubscribe"
			type: "POST"
			dataType: "json"
			data:
				apikey: @apiKey
				email_address: account.email
				id: @listId
				merge_vars:
					OPTINIP: Titanium.Platform.address
			success: (data, status, xhr) ->
				if data.error?
					e("Error subscribing to list!")
					failure(xhr, status, data)
				else
					d("Success subscribing", data, "Status:", status, "Code", xhr.status, "Response", xhr.responseText)
					success(data)
			error: failure
	
Citrus.Actions.Mailchimp.SubscribeAction = SubscribeAction

class PublishStreamAction extends Citrus.FacebookAction
	@declares: ["title", "data", "target"]

	type: "FacebookPublishStreamAction"
	buttonText: "Share"

	action: (account, success, failure) ->
		Titanium.Facebook.publishStream(@title, @data, @target, (e) =>
			if e.success
				success(e)
			else
				failure(e)
		)

Citrus.Actions.Facebook.PublishStreamAction = PublishStreamAction

# (new Citrus.TwitterAccount()).consumer.getXauthTokens _.extend({username:"zeebratest", password:"donthack"}, {
# 	onSuccess: (e) =>
# 		d "Sucess getting xauth tokens"
# 	onError: (xhr, status, e) =>
# 		d("Unable to get XAuth tokens with supplied data.")
# 		d status
# 		d xhr.status
# 		d xhr.responseText
# 		d e
# 	})
# 
# # Titanium.API.info "TESTING THE AUTHHEADER METHOD"
# # params = [
# # 		["x_auth_username", "oauth_test_exec"],
# # 		["x_auth_password", "twitter-xauth"],
# # 		["x_auth_mode","client_auth"]
# # 	]
# # 
# # message =
# # 	action: "https://api.twitter.com/oauth/access_token"
# # 	method: "post"
# # 	parameters: params
# # 
# # completeOpts =
# # 	consumerKey: "JvyS7DO2qd6NNTsXJ4E7zA"
# # 	consumerSecret: "9z6157pUbOBqtbm0A0q4r29Y2EYzIHlUwbF4Cl9c"
# # 
# # er message
# # er message
# # OAuth.setParameter(message, "oauth_nonce", "6AN2dKRzxyGhmIXUKSmp1JcB4pckM8rD3frKMTmVAo")
# # OAuth.setParameter(message, "oauth_timestamp", "1284565601")
# # OAuth.completeRequest(message, completeOpts)
# # er message
# # er OAuth.getAuthorizationHeader("twitter",params)
# # 
# # er 'OAuth oauth_nonce="6AN2dKRzxyGhmIXUKSmp1JcB4pckM8rD3frKMTmVAo", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1284565601", oauth_consumer_key="JvyS7DO2qd6NNTsXJ4E7zA", oauth_signature="1L1oXQmawZAkQ47FHLwcOV%2Bkjwc%3D", oauth_version="1.0"' == OAuth.getAuthorizationHeader("twitter",params)
# 
# 

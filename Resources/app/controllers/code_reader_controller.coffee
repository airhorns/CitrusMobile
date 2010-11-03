Ti.include('app/models/splash.js')
Ti.include('app/views/code_reader/code_reader_window.js')
Ti.include('app/controllers/splash_controller.js')

class CodeReaderController extends Citrus.Controller
	constructor: ->
		@window = new Citrus.CodeReaderWindow(this, 'Scanner','Scan a code!')
		@code = null
		
	focused: (e) ->
		if @code?
			# Show the code
		else
			this.attemptScan()
			
	attemptScan: ->
		Titanium.TiBar.scan({
		# configure: {
     #     classType: "ZBarReaderViewController"
     #     sourceType: "Camera"
     #     cameraMode: "Default"
     #     symbol: {
     #         "QR-Code":true
     #     }
     # }
		 configure: {
        classType: "ZBarReaderController"
        sourceType: "Album"
        cameraMode: "Default"
        symbol: {
            "QR-Code":true
        }
    }
		success: (data) ->
			if data?.barcode?
				Titanium.Media.vibrate()
				new Citrus.SplashController(data.barcode, root.accountStore)
		cancel: ->
			# alert("Canceled")
		error: ->
			alert("Error reading the code! Please try again.")
		})


Citrus.CodeReaderController = CodeReaderController

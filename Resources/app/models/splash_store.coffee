class SplashStore extends Citrus.Object
	constructor: () ->
		@db = Titanium.Database.open("citrus")
		
		# Temp reset
		if true
			names = []
			tables = @db.execute("SELECT name from sqlite_master WHERE type='table';")
			while tables.isValidRow()
				names.push tables.fieldByName('name')
				tables.next()
			tables.close()
	
			for name in names
				result = @db.execute("DROP TABLE IF EXISTS "+name)

			@db.execute("CREATE TABLE splashes IF NOT EXISTS (id INTEGER PRIMARY KEY, code STRING NOT NULL, name STRING NOT NULL, data TEXT NOT NULL)")
	
	addSplash: (data) ->
		if data.persistable?
			save = data.persistable()
		else
			save = data
		save = JSON.stringify(data)
	
		existing = @db.existing("SELECT id FROM splashes WHERE code = '?'", data.shortcode)
	
		if existing.isValidRow()
			return @db.execute("UPDATE splashes SET name = ?, data = ? WHERE id = ?", data.name, save, existing.fieldByName('id'))
		else
			return @db.execute("INSERT INTO splashes (code, name, data) VALUES (?, ?, ?)", data.shortcode, data.name, save)
	
	getSplashes: (offset, limit, callback) ->
		splashCursor = @db.execute("SELECT * FROM splashes LIMIT ? OFFSET ?")
		try
			while splashCursor.isValidRow()
				s = JSON.parse splashCursor.fieldByName('data')
				callback(null, s)
				splashCursor.next()
		catch e
			er "Error getting Splash JSON", splashCursor.fieldByName('data')
			callback(e, null)
		finally
			splashCursor.close()

Citrus.SplashStore = SplashStore

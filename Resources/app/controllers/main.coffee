# Helpers
Ti.include('app/helpers/icons_helper.js')

# Main controllers
Ti.include('app/controllers/accounts_controller.js')
Ti.include('app/controllers/code_reader_controller.js')
Ti.include('app/views/codes/codes_window.js')

root.tabGroup = Titanium.UI.createTabGroup({barColor:'#336699'})
Titanium.UI.setBackgroundColor('#000')
 
# Code Reader tab group
root.CodeReaderController = new Citrus.CodeReaderController()
codeReaderTab = Titanium.UI.createTab({
  icon:'images/radar.png',
  title:'Scanner',
  window: root.CodeReaderController.window.win
})


# Accounts List tab group
root.accountStore = new Citrus.AccountSet()
root.AccountsController = new Citrus.AccountsController(root.accountStore)

accountsTab = Titanium.UI.createTab({
  icon:'images/id-card.png',
  title:'Accounts',
  window: root.AccountsController.window.win
})

# Scanned Codes list tab group
root.CodesWindow = new Citrus.CodesWindow('Codes','No Codes scanned yet.')
codesTab = Titanium.UI.createTab({
  icon:'images/clock.png',
  title:'Scanned Codes',
  window: root.CodesWindow.win
})

root.tabGroup.addTab(tab) for tab in [codeReaderTab, accountsTab, codesTab]
root.tabGroup.setActiveTab(accountsTab)
root.tabGroup.open({transition:Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT})

Ti.include('test.js')

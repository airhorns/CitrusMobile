(function() {
  var accountsTab, codeReaderTab, codesTab, tab, _i, _len, _ref;
  Ti.include('app/helpers/icons_helper.js');
  Ti.include('app/controllers/accounts_controller.js');
  Ti.include('app/controllers/code_reader_controller.js');
  Ti.include('app/controllers/code_history_controller.js');
  root.tabGroup = Titanium.UI.createTabGroup({
    barColor: '#336699'
  });
  Titanium.UI.setBackgroundColor('#000');
  root.CodeReaderController = new Citrus.CodeReaderController();
  codeReaderTab = Titanium.UI.createTab({
    icon: 'images/radar.png',
    title: 'Scanner',
    window: root.CodeReaderController.window.win
  });
  root.accountStore = new Citrus.AccountSet();
  root.AccountsController = new Citrus.AccountsController(root.accountStore);
  accountsTab = Titanium.UI.createTab({
    icon: 'images/id-card.png',
    title: 'Accounts',
    window: root.AccountsController.window.win
  });
  root.splashStore = new Citrus.SplashStore();
  root.CodeHistoryController = new Citrus.CodeHistoryController();
  codesTab = Titanium.UI.createTab({
    icon: 'images/clock.png',
    title: 'Scanned Codes',
    window: root.CodeHistoryController.window.win
  });
  Titanium.include('test.js');
  _ref = [codeReaderTab, accountsTab, codesTab];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    tab = _ref[_i];
    root.tabGroup.addTab(tab);
  }
  root.tabGroup.setActiveTab(accountsTab);
  root.tabGroup.open({
    transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
  });
}).call(this);

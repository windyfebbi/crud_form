function loadMainForm() {
  const htmlServ = HtmlService.createTemplateFromFile("main");
  const html = htmlServ.evaluate();
  html.setWidth(1200).setHeight(700);
  const ui = SpreadsheetApp.getUi();
  ui.showModalDialog(html, "Database Mutasi");
}

function createMenu_() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu("Mutasi");
  menu.addItem("Load Data", "loadMainForm");
  menu.addToUi();
}

function onOpen() {
  createMenu_();
}

function loadPartialHTML_(partial) {
  const htmlServ = HtmlService.createTemplateFromFile(partial);
  return htmlServ.evaluate().getContent();
}

function loadSearchView() {
  return loadPartialHTML_("search");
}

function loadInputMutasiView() {
  return loadPartialHTML_("inputdata");
}

function loadEditMutasiView() {
  return loadPartialHTML_("editmutasi");
}

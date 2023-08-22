function getDataForSearch() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();             // get data from spreadsheet
  const ws = ss.getSheetByName("MUTASI");                       // get data from worksheet
  return ws.getRange(2, 1, ws.getLastRow()-1, 3).getValues();   // row, column, numRows ( -1 because have header), numColumns
}

function deleteById(id){
  const ss = SpreadsheetApp.getActiveSpreadsheet();             
  const ws = ss.getSheetByName("MUTASI");
  const mutasiIds = ws.getRange(2, 1, ws.getLastRow()-1, 1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = mutasiIds.indexOf(id.toString().toLowerCase());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2;
  ws.deleteRow(rowNumber);
} 

function getMutasiById(id){
  const ss = SpreadsheetApp.getActiveSpreadsheet();             
  const ws = ss.getSheetByName("MUTASI");
  const mutasiIds = ws.getRange(2, 1, ws.getLastRow()-1, 1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = mutasiIds.indexOf(id.toString().toLowerCase());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2;
  const mutasiInfo = ws.getRange(rowNumber, 1, 1, 4).getValues()[0];    // for display data fill before when edit 
  return { mutasiIds: mutasiInfo[0], firstName: mutasiInfo[1], lastName: mutasiInfo[2], phone: mutasiInfo[3] }
}

function editMutasiById(id,mutasiInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();             
  const ws = ss.getSheetByName("MUTASI");
  const mutasiIds = ws.getRange(2, 1, ws.getLastRow()-1, 1).getValues().map(r => r[0].toString().toLowerCase());
  const posIndex = mutasiIds.indexOf(id.toString().toLowerCase());
  const rowNumber = posIndex === -1 ? 0 : posIndex + 2;
  ws.getRange(rowNumber, 2,1,3).setValues([[
                                            mutasiInfo.firstName, 
                                            mutasiInfo.lastName, 
                                            mutasiInfo.phone
                                          ]]);
  return true;
}

function inputMutasi(mutasiInfo){
  const ss = SpreadsheetApp.getActiveSpreadsheet();             
  const ws = ss.getSheetByName("MUTASI");
  const uniqueIDs = ws.getRange(2, 1, ws.getLastRow()-1, 1).getValues();
  var maxNum = 0;
  uniqueIDs.forEach(r => {
    maxNum = r[0] > maxNum ? r[0] : maxNum
  });
  var newID = maxNum + 1;
  
  ws.appendRow([
                newID,
                mutasiInfo.firstName, 
                mutasiInfo.lastName, 
                mutasiInfo.phone
              ]);
}

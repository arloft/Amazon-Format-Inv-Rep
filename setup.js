/* Previous version, leaves "asin" column:

function setupInventorySheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("pq");
  ss.setFrozenRows(1);
  ss.setColumnWidth(1, 285);
  var asincolumn = ss.getRange("B:B");
  asincolumn.setNumberFormat("0000000000");
  ss.sort(4, true);
  ss.insertColumnAfter(3);
  var cellToReceivePriceFormula = ss.getRange("D2");
  cellToReceivePriceFormula.setValue("=round(sum(((C2*0.005)-C2)*-1),2)");
}
*/

function renameTheSheet() {
  var ss = SpreadsheetApp.getActiveSheet();
  var newSheetName = ss.getName();
  newSheetName = "pq";
  ss.setName(newSheetName);
}

// Revised version, deletes "asin" column, formula values are adjusted accordingly
function setupInventorySheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("pq");
  var lastRow = SpreadsheetApp.getActiveSheet().getLastRow();
  Logger.log(lastRow); // logs lastRow, to verify no content rows are deleted
  ss.setFrozenRows(1);
  ss.setColumnWidth(1, 285);
  // Following 2 lines not needed with "asin" column deleted (line 32).
  // var asincolumn = ss.getRange("B:B");
  // asincolumn.setNumberFormat("0000000000");
  ss.sort(4, true);
  ss.deleteColumn(6); // deletes 6th empty column
  ss.deleteColumn(5); // deletes 5th empty column
  ss.deleteColumn(2); // deletes "asin" column
  ss.deleteRow(lastRow+1); // delete last empty row
  ss.deleteRow(lastRow+1); // delete last empty row
  ss.insertColumnAfter(2);
  var cellToReceivePriceFormula = ss.getRange("C2"); // C2 cell addresses updated
  cellToReceivePriceFormula.setValue("=round(sum(((B2*0.005)-B2)*-1),2)"); // B2 cell address updated
  // ^ LOWER prices by 5%
  // cellToReceivePriceFormula.setValue("=round(((B2*0.005)+B2),2)"); // B2 cell address updated
  // ^ RAISE prices by X% (by default, X is 5%)
}

renameTheSheet();
setupInventorySheet();
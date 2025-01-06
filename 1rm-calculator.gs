function calculate1RM() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Clear previous results
  sheet.getRange('D2:E13').clearContent();
  
  // Get input values
  const weight = sheet.getRange('B1').getValue();
  const reps = sheet.getRange('B2').getValue();
  
  // Validate input
  if (isNaN(weight) || isNaN(reps) || weight <= 0 || reps <= 0) {
    SpreadsheetApp.getUi().alert('Please enter valid weight and reps');
    return;
  }
  
  // Calculate 1RM using Epley formula
  const oneRM = weight * (1 + reps / 30);
  
  // Calculate and display results for 1-12 rep max
  const results = [];
  for (let i = 1; i <= 12; i++) {
    const rmWeight = oneRM / (1 + i / 30);
    sheet.getRange(`D${i + 1}`).setValue(`${i}RM`);
    sheet.getRange(`E${i + 1}`).setValue(rmWeight.toFixed(2));
  }
  
  // Add explanation
  sheet.getRange('G1').setValue('How It Works:');
  sheet.getRange('G2').setValue('The calculator uses the Epley formula:');
  sheet.getRange('G3').setValue('1RM = w × (1 + r/30)');
  sheet.getRange('G4').setValue('Where:');
  sheet.getRange('G5').setValue('w = weight lifted');
  sheet.getRange('G6').setValue('r = number of reps');
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('1RM Calculator')
    .addItem('Calculate', 'calculate1RM')
    .addToUi();
}

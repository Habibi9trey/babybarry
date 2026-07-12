/**
 * Baby Barry Land — RSVP backend (Google Apps Script)
 *
 * Receives RSVP form submissions from the website, appends each one
 * as a row in this Google Sheet, and emails you a notification.
 * Full setup steps are in README.md.
 */

const NOTIFY_EMAIL = 'habibi93.ab@gmail.com';   // where RSVP notifications go
const SHEET_NAME = 'RSVPs';

function doPost(e) {
  const p = (e && e.parameter) || {};

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Attending', 'Party size', 'Note']);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
  }

  sheet.appendRow([
    new Date(),
    p.name || '',
    p.attending || '',
    p.guests || '',
    p.note || ''
  ]);

  MailApp.sendEmail(
    NOTIFY_EMAIL,
    '🧸 Baby Shower RSVP — ' + (p.name || 'Someone'),
    'A new RSVP just came in!\n\n' +
    'Name: ' + (p.name || '—') + '\n' +
    'Attending: ' + (p.attending || '—') + '\n' +
    'Party size: ' + (p.guests || '—') + '\n' +
    'Note: ' + (p.note || '—') + '\n\n' +
    'All RSVPs: ' + ss.getUrl()
  );

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

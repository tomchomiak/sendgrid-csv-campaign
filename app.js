/*
 * Load env variables
 */
var dotenv = require('dotenv');
dotenv.load();
var SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
var SENDGRID_TEMPLATE_ID = process.env.SENDGRID_TEMPLATE_ID;
var DEFAULT_CSV_INPUT_PATH = process.env.DEFAULT_CSV_INPUT_PATH;
var DEFAULT_CSV_SKIP_HEADERS = process.env.DEFAULT_CSV_SKIP_HEADERS;
var DEFAULT_CSV_FIRST_NAME_COL = process.env.DEFAULT_CSV_FIRST_NAME_COL;
var DEFAULT_CSV_EMAIL_COL = process.env.DEFAULT_CSV_EMAIL_COL;
var DEFAULT_CSV_PROJECT_COL = process.env.DEFAULT_CSV_PROJECT_COL;
var DEFAULT_CSV_URL_COL = process.env.DEFAULT_CSV_URL_COL;


/*
 * Initialze Sendgrid
 */
var sendgrid  = require('sendgrid')(SENDGRID_API_KEY);

var payload   = {
  to      : 'to@example.com',
  from    : 'from@other.com',
  subject : 'Saying Hi',
  text    : 'This is my first email through SendGrid'
}

sendgrid.send(payload, function(err, json) {
  if (err) { console.error(err); }
  console.log(json);
});
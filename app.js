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



var sendEmail = function (options){

		var mail = new sendgrid.Email();

		var firstname = options.firstname;
		var email  = options.email;
		var project   = options.project;
		var subject   = options.subject;
		

		mail.subject = subject;
		mail.from = 'help@yourwordgroups.com';
		mail.fromname = 'YourWord Network';
		mail.text = ' ';
		mail.html = ' ';
		mail.addTo(email);


		mail.addSubstitution('%FIRSTNAME%', firstname);
		mail.addSubstitution('%PROJECT%', project);
		mail.addSubstitution('%URL%', url);


		// add filter settings one at a time 
		mail.addFilter('templates', 'enable', 1);
		mail.addFilter('templates', 'template_id', SENDGRID_TEMPLATE_ID);
		 

		sendgrid.send(mail, function(err, json) {
		  if (err) { return console.error(err); }
		  console.log(json);
		});
}





var firstname = 'Tom';
var email = 't.chomiak@hallandpartners.com';
var project   = '1234';
var url = 'http://www.tomchomiak.com';
var firstname = 'Tom';

sendEmail({
	firstname: firstname,
	email: email,
	project: project,
	subject: 'Talk to us about your April YWN project ' + project
})



var firstname = 'Tom';
var email = 't.chomiak@hallandpartners.com';
var project   = 'ABCD';
var url = 'http://www.google.com';
var firstname = 'Tom';

sendEmail({
	firstname: firstname,
	email: email,
	project: project,
	subject: 'Talk to us about your April YWN project ' + project
})
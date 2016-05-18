var fs = require('fs');
var csv = require("fast-csv");
var dotenv = require('dotenv');

/*
 * Load env variables
 */
dotenv.load();
var SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
var SENDGRID_TEMPLATE_ID = process.env.SENDGRID_TEMPLATE_ID;
var DEFAULT_CSV_INPUT_PATH = process.env.DEFAULT_CSV_INPUT_PATH;
var DEFAULT_CSV_SKIP_HEADERS = process.env.DEFAULT_CSV_SKIP_HEADERS;


var DEFAULT_CSV_PROJECT_COL = process.env.DEFAULT_CSV_PROJECT_COL;
var DEFAULT_CSV_FIRST_NAME_COL = process.env.DEFAULT_CSV_FIRST_NAME_COL;
var DEFAULT_CSV_EMAIL_COL = process.env.DEFAULT_CSV_EMAIL_COL;
var DEFAULT_CSV_URL_COL = process.env.DEFAULT_CSV_URL_COL;


/*
 * Initialze Sendgrid
 */
var sendgrid  = require('sendgrid')(SENDGRID_API_KEY);



var sendEmail = function (options){

		var mail = new sendgrid.Email();

		var project   = options.project;
		var firstname = options.firstname;
		var email  = options.email;
		var url   = options.url;
		
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

		  if (json.message == 'success') {
		  	console.log('Email sent to ' + email)
		  }
		});
}




/*
 * Assemble Emails
 */
var emailArray  = [];
var stream = fs.createReadStream(DEFAULT_CSV_INPUT_PATH);
var csvStream = csv()
    .on("data", function(data){

      var string = data.toString();
      var col = string.split(",");
      var project = col[DEFAULT_CSV_PROJECT_COL];
      var firstname = col[DEFAULT_CSV_FIRST_NAME_COL];
      var email = col[DEFAULT_CSV_EMAIL_COL];
      var url = col[DEFAULT_CSV_URL_COL];

      emailArray.push({
      	project: project,
      	firstname: firstname,
      	email: email,
      	url: url,
      	subject: 'Talk to us about your April YWN project ' + project
      })

      
    })
    .on("end", function(){

         console.log("Done assembling email array");
         console.log("Preparing to send");

					var i = 0;
					var l = emailArray.length;

					function sendLoop () {
					   setTimeout(function () {
					      i++;
					      if (i < l) {

					      	var obj = {
					      		project: emailArray[i].project,
					      		firstname: emailArray[i].firstname,
					      		email: emailArray[i].email,
					      		url: emailArray[i].url,
					      		subject: emailArray[i].subject
					      	}

					      	if (DEFAULT_CSV_SKIP_HEADERS && i > 0) sendEmail(obj);
					      	else if (!DEFAULT_CSV_SKIP_HEADERS) sendEmail(obj);

					        sendLoop();
					      }
					   }, 50)
					}

					sendLoop();
    });
  
stream.pipe(csvStream);
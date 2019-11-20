const request = require('request');


describe('API Request', () => {
	/*var app;
	beforeAll(() => {
		app = require('../app');
	});
	afterAll(() => {
		app.close();
	});*/

	describe('GET /', () => {
		const data = {};
		beforeAll((done) => {
			request.get('http://localhost:3000/api/v1/users', (error, response, body) => {
				data.status = response.statusCode;
				data.body = JSON.parse(body);
				data.error = error;
				console.log('statusCode 0',data.status)
				done();
			});
		});
		it('Should return Status 200', () => {
			expect(data.status).toBe(200);
		});		
	});

	/*describe('POST /', () => {
		var formData = {
			firstname: "Ubon",
			lastname: "Udofia",
			email: "ub@gmail.com",
			password: "password",
			gender: "male",
			jobrole: "Systems Manager",
			department: "Education",
			address: "Naida",
      		maritalstatus: "single"
		}
		let data = {};
		beforeAll((done) => {
			request.post({url:'http://localhost:3000/api/v1/auth/create-user', formData: formData}, function optionalCallback(err, httpResponse, body) {
			  if (err) {
			    return console.error('upload failed:', err);
			  }
			  data.status = httpResponse.statusCode;
			  data.body = body;
			  console.log('Upload successful!  Server responded with:', body);
			  done();
			});
		});
		it('Should return Status 201', () => {
			expect(data.status).toBe(201);
		});
	});

	describe('Login a user POST /auth/login', () => {
		var formData = {
			email : 'String' ,
			password : 'String' ,
		}
		beforeAll((done) => {
			request.post({url:'http://localhost:3000/api/v1/auth/login', formData: formData}, function optionalCallback(err, httpResponse, body) {
			  if (err) {
			    return console.error('upload failed:', err);
			  }
			  data.status = httpResponse.statusCode;
			  data.body = body;
			  console.log('Upload successful!  Server responded with:', body);
			  done();
			});
		});
	});*/
});

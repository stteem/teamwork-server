const mocha = require('mocha');
const chai = require('chai');
const expect = require('chai').expect;
const app = require('../app');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const request = require('request');
//const feeds = require('./feeds.json');
const feed = require('../controllers/feed');
const { describe, afterEach, beforeEach, it } = mocha;
const baseUrl = 'http://localhost:3000';

chai.should();

chai.use(chaiHttp);


describe('App', () => {
  it('Should exists', () => {
    expect(app).to.be.a('function');
  })
})

describe('API Requests', () => {

  	// Test POST route

	describe('POST /api/v1/auth/signin', () => {

		let isadmin, token;

		it('should not login with wrong creds', (done) => {

			const loginDetails = {
			   	"email": "ekn@gmail.com",
			   	"password": "password"
			}

			chai.request(app)
			.post('/api/v1/auth/signin')
			.send(loginDetails)
			.end((err, response) => {
				if (err) {
		            return console.error('POST login failed:', err);
		        }
	        expect(response).to.have.status(400);
	        expect(response).to.be.an('object');
	        response.body.should.have.property('message').eql('User not found');
	      	done();
			})
		})

		it('should login and return token', (done) => {
	
			chai.request(app)
			.post('/api/v1/auth/signin')
			.send({
				"email": "ekon@gmail.com",
				"password": "password"
			})
			.end((err, response) => {
				if (err) {
	            return console.error('POST login failed:', err);
	        }
	        token = response.body.token;
	        isadmin = response.body.isadmin;
	        //console.log('token ', token)
	        expect(response).to.have.status(200);
	      	expect(response).to.be.an('object');
	      	response.body.should.include.keys('userid', 'firstname', 'isadmin', 'token');
	      	done();
			})
		})

		it.skip('should create a user', (done) => {
			const values = {
				firstname: "John",
		    	lastname: "Cleton", 
		    	email: "cleton@gmail.com", 
		    	password: "password", 
		    	gender: "male", 
		    	jobrole: "manager", 
		    	department: "finance", 
		    	address: "ikot ekpene", 
		    	maritalstatus: "Married", 
		    	isadmin: true
			}
			//console.log('token 2', token)
			const newUser = {
				method: 'POST',
		        headers: { 
		            'Content-Type': 'application/json',
		            'Authorization': token
		        },
		        body: JSON.stringify(values)
			}
			chai.request(app)
			.post('/api/v1/auth/signin')
			.type('form')
			//.auth('token', token)
			.send(newUser)
			.end((err, response) => {
				if (err) {
	            return console.error('POST login failed:', err);
	        }
	        expect(response).to.have.status(201);
	      	expect(response).to.be.an('object');
	      	done();
			})
		})
	})

	// Test GET route

	describe('GET /api/vi/feed', () => {
	it('should GET the feeds', (done) => {
	  chai.request(app)
	    .get('/api/v1/feed')
	    .end((err, response) => {
	      if (err) {
	        return console.error('GET feed failed:', err);
	      }
	      expect(response).to.have.status(200);
	      expect(response.body).to.be.an('object');
	      expect(response.body.data).to.be.an('array');
	      done()
	    })
	})

	it('should NOT GET the feeds with wrong url', (done) => {
	  chai.request(app)
	    .get('/api/v1/feedS')
	    .end((err, response) => {
	      if (err) {
	        return console.error('GET feed failed:', err);
	      }
	      response.should.have.status(404);
	      done()
	    });
	})
	})

})

// When GET feed is stubbed
describe.skip('When GET /api/v1/feed is stubbed', () => {
  	let stubbed;

  	before(() => {
  		const response = {

		    "res": {
		        "status": 200,
		        "headers": {
		          "content-type": "application/json"
		        }
		     },

			"body": {
		      	"status": 'success',
		      	"data": [
				    {
				      "itemid": 108,
				      "imageurl": 'http://res.cloudinary.com/dk02ty1w8/image/upload/v1581246968/bjr071glnykfeg1ccja0.jpg',
				      "article": null,
				      "title": 'meetup',
				      "userid": 106,
				      "createdon": '2020-02-09T10:15:52.165Z',
				      "firstname": 'Ubong',
				      "lastname": 'Umoh'
				    },
				    {
				      "itemid": 2,
				      "imageurl": null,
				      "article": 'Lorem ipsum ipsum lorem foo bar bar foo.',
				      "title": 'The man who saw tommorow',
				      "userid": 106,
				      "createdon": '2020-01-25T18:15:04.990Z',
				      "firstname": 'Ubong',
				      "lastname": 'Umoh'
				    },
				    {
					  "itemid": 7,
					  "imageurl": null,
					  "article": 'The beautiful ones are not yet born',
					  "title": 'Beauty',
					  "userid": 107,
					  "createdon": '2019-12-04T18:30:31.831Z',
					  "firstname": 'Ekong',
					  "lastname": 'Udoh'
		        	}
			    ]
		    }
		}

    	stubbed = sinon.stub(feed, 'getFeed').resolves(response);	
  	});

  	after(() => {
	 stubbed.restore();
  	});

  	describe('GET /api/v1/feed', () => {
	    it('should return stubbed feeds', (done) => {
	      chai.request(app)
	      .get('/api/v1/feed')
	      .end((err, res) => {
	      		if (err) {
		            return console.error('GET feed failed:', err);
		        }
		       	//console.log('res obj', res)
			    // there should be a 200 status code
	            res.res.should.have.status(200);
	            //feed.getFeed.should.have.been.calledOnce;
	            res.body.should.have.property('success')
	            //res.body.should.have.property('body')
	            // the response should be JSON
	            //res.success.headers['content-type'].should.contain('application/json');
	            // parse response body
	            //body = JSON.parse(res.body);
	            // the JSON response body should have a
	            // key-value pair of {"status": "success"}
	            //body.status.should.eql('success');
	            // the JSON response body should have a
	            // key-value pair of {"data": [3 movie objects]}
	            //body.data.length.should.eql(3);
	            // the first object in the data array should
	            // have the right keys
	            /*body.data[0].should.include.keys(
	              'itemid', 'imageurl', 'article', 'title', 'userid', 'createdon', 'firstname', 'lastname'
	            );*/
	            // the first object should have the right value for name
	            //body.data[0].itemid.should.eql(108);
	            done();
	          })
	    })
  })
})

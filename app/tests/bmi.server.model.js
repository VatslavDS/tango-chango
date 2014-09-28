'use strict';

/**
* Module dependencies.
**/
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    BMI = mongoose.model('Bmi');

/**
* GLobals
**/
var user, bmi;

/**
* Unit Tests
*/
describe('BMI Model Unit Test:', function() {
    beforeEach(function(done) {
	   user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			bmi = new BMI({
				index: 34,
				mass: 40,
				height: 1.75,
				category: 'TEST CATEGORY',
				user: user
			});

			done();
		});
    });
    describe('Method Save', function() {
	it('Should be able to save without problems', function(done) {
	    return bmi.save(function(err) {
		should.not.exist(err);
		done();
	    });
	});
	
	it('should be able to show an error try to save without index mass', function(done){
	    bmi.index = 0;
	    return bmi.save(function(err) {
	 	should.not.exist(err);
	    });
         });
    });

    describe('Method Delete', function() {
	it('Should be able to delete a bmi without problems', function(done) {
 	    return bmi.remove(function(err) {
		should.exist(err);
	    });
	});

	it('Should be able to show an error try to remove without index mass', function(done){
	    bmi.index = 0;
	    return bmi.remove(function(err) {
		should.exist(err);
	    });
	});

	it('Should be able to show an error try to remove without height', function(done){
	    bmi.height = 0;
	    return bmi.remove(function(err) {
		should.exist(err);
	    });
	});

         it('Should be able to show an error try to remove without mass', function(done){
	    bmi.mass = 0;
	    return bmi.remove(function(err) {
		should.exist(err);
	    });
	});	
    });

    afterEach(function(done) {
	BMI.remove().exec();
	User.remove().exect();
	done();
    });
});

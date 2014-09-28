'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	BMI = mongoose.model('Bmi'),
	_ = require('lodash');

/**
* Create a BMI
*/
exports.create = function(req, res) {
    var bmi = new BMI(req.body);
    bmi.save(function(err) {
	if(err) {
	    return res.status(400).send({
		message: errorHandler.getErrorMessage(err)
		 });
	} else {
	    res.jsonp(bmi);
	}
    });
};

/**
* Show the current BMI
*/
exports.read = function(req, res) {
	res.jsonp(req.bmi);
};

/**
* Update BMI
*/
exports.update = function(req, res) {
    var bmi = req.bmi;

    bmi = _.extend(bmi, req.body);
    bmi.save(function(err){
	if(err) {
	    return res.status(400).send({
		message: errorHandler.getErrorMessage(err)
	    });
	} else {
	    res.jsonp(bmi);
	}
    });
};

/**
* Delete a BMI
*/
exports.delete = function(req, res) {
    var bmi = req.bmi;
    bmi.remove(function(err) {
        if (err) {
	    return res.status(400).send({
		message: errorHandler.getErrorMEssage(err)
	    });
	} else {
	    res.jsonp(bmi);
	}
    });
};

/**
* List of bmi
**/
exports.list = function(req, res) {
    BMI.find().sort('-created').populate('user', 'displayName').exec(function(err, bmi) {
	if (err) {
	    return res.status(400).send({
		message: errorHandler.getErrorMessage(err)
	    });
	} else {
	    res.jsonp(bmi);
	}
    });
};

/**
* BMI middleware
**/
exports.bimById = function(req, res, next, id) {
	BMI.findById(id).populate('user', 'displayName').exec(function(err, bmi) {
		if (err) return next(err);
		if (!bmi) return next(new Error('Failed to load bmi ' + id));
		req.bmi = bmi;
		next();
	});
};

/**
 * BMI authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bmi.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};

'use strict';

/**
* Module dependencies;
*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/**
* BMI Schema
**/
var BimSchema = new Schema({
    created: {
        type: Date,
	default: Date.now
    },
    index: {
        type: Number,
	default: 1,
	min:1 
    },
    mass: {
	type: Number,
	default: 1,
	min: 1,
	max: 300
    },
    height: {
    	type: Number,
	default: 0.1,
	min: 0.1,
	max: 3
    },
    category: {
	type: String,
	default: ''
    },
    user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
}); 

mongoose.model('Bmi', BimSchema);


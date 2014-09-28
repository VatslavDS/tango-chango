'use strict';

/**
* Module dependencies.
**/
var users = require('../../app/controllers/users'),
    bims = require('../../app/controllers/bmi');

module.exports = function(app) {
    //BMI Routes
    app.route('/bims')
	.get(bims.list)
	.post(users.requiresLogin, bims.create);


    app.route('/bims/:bimId')
	.get(bims.read)
	.put(users.requiresLogin, bims.hasAuthorization, bims.update)
	.delete(users.requiresLogin, bims.hasAuthorization, bims.delete);

//Finish by binding the bmi middleware

    app.param('bimId', bims.bimById);
};

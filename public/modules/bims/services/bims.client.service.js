'use strict';

//Bims service used for communicating with the articles REST endpoints
angular.module('bims').factory('Bims', ['$resource',
	function($resource) {
		return $resource('bims/:bimId', {
			bimId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

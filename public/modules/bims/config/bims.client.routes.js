'use strict';

// Setting up route
angular.module('bims').config(['$stateProvider',
	function($stateProvider) {
		// BIMS state routing
		$stateProvider.
		state('listBims', {
			url: '/bims',
			templateUrl: 'modules/bims/views/list-bims.client.view.html'
		}).
		state('createBim', {
			url: '/bims/create',
			templateUrl: 'modules/bims/views/create-bim-client.view.html'
		}).
		state('viewBim', {
			url: '/bims/:bimId',
			templateUrl: 'modules/bims/views/view-bim.client.view.html'
		}).
		state('editBim', {
			url: '/bims/:bimId/edit',
			templateUrl: 'modules/bims/views/edit-bim.client.view.html'
		});
	}
]);

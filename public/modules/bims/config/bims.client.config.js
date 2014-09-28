'use strict';

// Configuring the Articles module
angular.module('bims').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Bims', 'bims', 'dropdown', '/bims(/create)?');
		Menus.addSubMenuItem('topbar', 'bims', 'List Bims', 'bims');
		Menus.addSubMenuItem('topbar', 'bims', 'New Bim', 'bims/create');
	}
]);

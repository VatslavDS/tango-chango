'use strict';

(function() {
	// Bims Controller Spec
	describe('BimsController', function() {
		// Initialize global variables
		var BimsController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Bims controller.
			BimsController = $controller('BimsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one bim object fetched from XHR', inject(function(Bims) {
			// Create sample article using the Articles service
			var sampleBim = new Bims({
			    index: 56,
			    height: 76,
			    mass: 56
			});

			// Create a sample Bims array that includes the new bim 
			var sampleBims = [sampleBim];

			// Set GET response
			$httpBackend.expectGET('bims').respond(sampleBims);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bims).toEqualData(sampleBims);
		}));

		it('$scope.findOne() should create an array with one bim object fetched from XHR using a bimId URL parameter', inject(function(Bims) {
			// Define a sample article object
			 var sampleBim = new Bims({
			    index: 56,
			    height: 76,
			    mass: 56
			});

			// Set the URL parameter
			$stateParams.bimId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bims\/([0-9a-fA-F]{24})$/).respond(sampleBim);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bim).toEqualData(sampleBim);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Bims) {
			// Create a sample article object
			var sampleBimPostData = new Bims({
			    index: 56,
			    height: 76,
			    mass: 67
			});

			// Create a sample article response
			var sampleBimResponse = new Bims({
				_id: '525cf20451979dea2c000001',
				index: 56,
				height: 76,
				mass: 67
			});

			// Fixture mock form input values
			scope.index = 8;
			scope.mass = 54;
			scope.height = 76;
			scope.mass = 67;

			// Set POST response
			$httpBackend.expectPOST('bims', sampleBimPostData).respond(sampleBimResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test URL redirection after the article was created
			expect($location.path()).toBe('/bims/' + sampleBimResponse._id);
		}));

		it('$scope.update() should update a valid bim', inject(function(Bims) {
			// Define a sample bim put data
		         var sampleBimPut = new Bims({
				_id: '525cf20451979dea2c000001',
				index: 56,
				height: 76,
				mass: 67
			});	

			// Mock article in scope
			scope.article = sampleBimPut;

			// Set PUT response
			$httpBackend.expectPUT(/bims\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bims/' + sampleBimPut._id);
		}));
	it('$scope.remove() should send a DELETE request with a valid bimId and remove the bim from the scope', inject(function(Bims) {
			// Create new article object
			var sampleBim = new Bims({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new articles array and include the article
			scope.bims = [sampleBim];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bims\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBim);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.bims.length).toBe(0);
		}));
	});
}());


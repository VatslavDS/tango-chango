'use strict';

angular.module('bims').controller('BimsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Bims',
	function($scope, $stateParams, $location, Authentication, Bims) {
		$scope.authentication = Authentication;
		$scope.index = 0;
		$scope.calculate_index = function(){
		    $scope.index = (this.mass / Math.pow(2, this.height));
		    return $scope.index;
		};

		$scope.categoryCalculator = function() {
			return function fnPrivate() {
		        var currIndex = this.calculate_index();	
			var category;
			if(currIndex < 15.0) {
			    category = 'Very severely underweight';
			} else if(currIndex <= 16.0 && currIndex >= 15.0) {
			    category = 'Severely underweight'; 
			} else if(currIndex >= 16.09 && currIndex <= 18.5) {
			    category = 'Underweight';
			} else if(currIndex >= 18.51 && currIndex <= 25.0) {
			    category = 'Normal (healthy weight)';
			} else if(currIndex >= 25.09 && currIndex <= 30.0) {
			    category = 'Overweight';
			} else if(currIndex >= 30.09  && currIndex <= 35.0) {
			    category = 'Obese Class I (Moderately obese)';
			} else if(currIndex >= 35.09 && currIndex <= 40.0) {
			    category = 'Obese Class II (Severely obese)';
			} else if(currIndex > 40.0) {
			    category = 'Obese Class III (Very severely obese)';
			}
			return category;
			};
   		};

		$scope.create = function() {
			var bim = new Bims({
			    index: this.calculate_index(),
			    mass: this.mass,
			    height: this.height,
			    category: this.categoryCalculator().call($scope)
			});
			bim.$save(function(response) {
				console.log(response);
				$location.path('bims/' + response._id);
				$scope.mass = 1;
				$scope.ent = 1;
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(bim) {
			if (bim) {
				bim.$remove();

				for (var i in $scope.bims) {
					if ($scope.bims[i] === bim) {
						$scope.bims.splice(i, 1);
					}
				}
			} else {
				$scope.bim.$remove(function() {
					$location.path('bims');
				});
			}
		};

		$scope.update = function() {
			var bim = $scope.bim;

			bim.$update(function() {
				$location.path('bims/' + bim._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.bims = Bims.query();
		};

		$scope.findOne = function() {
			$scope.bim = Bims.get({
				bimId: $stateParams.bimId
			});
		};
	}
]);

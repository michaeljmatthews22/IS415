	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	scotchApp.factory("car", function() {
	    return {};
	});

	// configure our routes
	scotchApp.config(function($routeProvider) {
	    $routeProvider

	        // route for the home page
	        .when('/', {
	            templateUrl: 'pages/home.html',
	            controller: 'offerController'
	        })

	        // route for the about page
	        .when('/decision', {
	            templateUrl: 'pages/decision.html',
	            controller: 'decisionController'
	        })

	        // route for the contact page
	        .when('/getDetails', {
	            templateUrl: 'pages/getDetails.html',
	            controller: 'getDetailsController'
	        });
	});


	scotchApp.controller('offerController', function($scope, $location, car) {
	    $scope.car = car;

	    $scope.noStoreOffer = function() {
	        $scope.car.hasOffer = false;
	        $location.path("/getDetails");
	    }
	    // get the initial offer amount
	    $scope.storeOffer = function() {

	        $scope.car.offerAmount = $scope.offerAmount;
	        $scope.car.hasOffer = true;

	        console.log($scope.offerAmount);
	        $location.path("/getDetails");
	    }


	});

	scotchApp.controller('getDetailsController', function($scope, $location, car, $http) {

	    $scope.car = car;

	    $scope.age = ["1 year", "2 years", "3 years", "4 years", "5 years", "6 years",
	        "7 years", "8 years", "9 years", "10 years"
	    ];
	    $scope.make = ["ACURA", "BUICK", "CADILLAC", "CHEVORLET", "CHRYSLER", "DODGE", "FORD", "GMC", "HONDA", "HUMMER",
	        "HYUNDAI", "INFINITI", "ISUZU", "JEEP", "KIA", "LEXUS", "LINCOLN", "MAZDA", "MERCURY", "MINI", "MITSUBISHI",
	        "NISSAN", "OLDSMOBILE",
	        "PLYMOUTH",
	        "PONTIAC",
	        "SATURN",
	        "SCION",
	        "SUBARU",
	        "SUZUKI",
	        "TOYOTA",
	        "TOYOTA SCION",
	        "VOLKSWAGEN",
	        "VOLVO"
	    ];

	    $scope.color = ["BEIGE", "BLACK", "BLUE", "BROWN", "GOLD", "GREEN", "GREY", "MAROON",
	        "ORANGE", "PURPLE", "RED", "SILVER", "WHITE", "YELLOW", "NA", "OTHER"
	    ];

	    if ($scope.car.hasOffer) {
	        $scope.message = "Looks like you have a good offer. Lets just make sure you're getting a good deal";
	    } else {
	        $scope.message = "No offer. No problem. Lets get some more details and then you can make sure they offer you a fair deal";
	    }

	    $scope.carDetails = function() {

	        //hit API
	        //hardcoding value
	        $scope.car.est_value = 5000;
	        $location.path("/decision");
	    }

	});

	scotchApp.controller('decisionController', function($scope, car) {

	    $scope.car = car;

	    if ($scope.car.hasOffer) {
	        $scope.car.net = $scope.car.offerAmount - $scope.car.est_value;

	        if ($scope.car.net < 0) {
	            $scope.car.to_sell = false;
	            $scope.message = "Don't trade it in. They are offering you a lower amount than you deserve."
	        } else {
	            $scope.car.to_sell = true;
	            $scope.message = "Sell. They are offering you a greater amount than the car is worth."
	        }
	    } else {
	        $scope.message = "Here is some information that might be helpful for you when you go into decide."
	    }


	});

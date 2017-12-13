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

	    $scope.wheel = ["Alloy", "Covers", "Special", "Unknown"];

	    $scope.auction = [
	        "Adesa",
	        "Manheim",
	        "Other"
	    ];

	    $scope.size = [
	        "Compact",
	        "Crossover",
	        "Large",
	        "Large SUV",
	        "Large Truck",
	        "Medium",
	        "Medium SUV",
	        "Small SUV",
	        "Small Truck",
	        "Specialty",
	        "Sports",
	        "Van"
	    ];

	    $scope.state = [
	        "AL",
	        "AR"
	    ];

	    $scope.submodel = [
	        "4D WAGON LW300",
	        "4D WAGON LX",
	        "4D WAGON OUTBACK",
	        "4D WAGON OUTBACK SPORT"
	    ];

	    if ($scope.car.hasOffer) {
	        $scope.message = "Looks like you have a good offer. Lets just make sure you're getting a good deal";
	    } else {
	        $scope.message = "No offer. No problem. Lets get some more details and then you can make sure they offer you a fair deal";
	    }

	    $scope.carDetails = function() {

	        // var car_data = {
	        //     "make": $scope.car_make,
	        //     "age": $scope.car_age,
	        //     "color": $scope.car_color,
	        //     "miles": $scope.car_miles
	        // };
	        //
	        //
	        // $http({
	        //     method: 'POST',
	        //     url: 'https://reqres.in/api/users',
	        //     data: car_data,
	        //     headers: {
	        //         'Content-Type': 'application/x-www-form-urlencoded'
	        //     }
	        // }).success(function(data){
	        // 	console.log(data);
	        //
	        // 	$scope.car.est_value = data.id;
	        // 	$location.path("/decision");
	        //
	        // });

	        var cleaned_data = {
	            'CarID': "",
	            'Auction': "Adesa",
	            'BYRNO': "",
	            'Color': "RED",
	            'IsBadBuy': "",
	            'Make': "MAZDA",
	            'Size': "MEDIUM",
	            'SubModel': "4D Sedan",
	            'TopThreeAmericanName': "",
	            'Trim': "",
	            'VehicleAge': "3",
	            'VehOdo': "60000",
	            'VehYear': "",
	            'VNST': "FL",
	            'WarrantyCost': "",
	            'WheelType': "Alloy",
	        };



	        var api_url = "https://ussouthcentral.services.azureml.net/workspaces/4a66ec34e5894d9ba6d646b2e8391701/services/8868eb84c2a54fd080abcfff6954534a/execute?api-version=2.0&format=swagger";

	        $http({
	            method: 'POST',
	            url: api_url,
	            data: cleaned_data,
	            headers: {
	                "content-type" : "application/json",
	                "authorization": "Bearer LITdefQ8FcjY3guuEF9jhJ+/8FFi1vjJAMEjXbR7gaW1gKoMENHGg10LL+ZaEE+iX73PhhpKMncKxB9TyPa5gg==",
	                "cache-control": "no-cache",
	                "postman-token": "84ee06bd-e3a8-dd8c-cd1a-683c1ebc6a92"
	            }
	        }).success(function(res) {
	            console.log(res);
							console.log("Success!");
	        });




	    }

	});

	scotchApp.controller('decisionController', function($scope, car) {

	    $scope.car = car;

	    if ($scope.car.hasOffer) {
	        $scope.car.net = $scope.car.offerAmount - $scope.car.est_value;

	        if ($scope.car.net < 0) {
	            $scope.car.to_sell = false;
	            $scope.message = "Don't sell."
	        } else {
	            $scope.car.to_sell = true;
	            $scope.message = "Sell."
	        }
	    } else {
	        $scope.message = "See the results below!"
	    }


	});

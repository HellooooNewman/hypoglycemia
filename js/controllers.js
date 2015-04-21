
app.controller('DashCtrl', function($scope, UserAuthFactory, dataFactory, $filter, $window, $http) {
	$scope.logout = function () {
		UserAuthFactory.logout();
    };


    $scope.symptoms = [];

    dataFactory.getSymptoms().then(function(data){
    	$scope.symptoms = data.data;
    	console.log($scope.symptoms);
    	for (var i=0; i < $scope.symptoms.length; i++) {
      		$scope.symptoms[i].timeofday = $filter('date')($scope.symptoms[i].created * 1000, 'shortTime');
      		$scope.symptoms[i].specificday = $filter('date')($scope.symptoms[i].created * 1000, 'MMMM d y');
      	}
	});
  

//--------date picker--------//

	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.parent = {
		dt:''
	};

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		console.log($scope.dt);
		console.log($scope.symptoms);
		$scope.opened = true;

	};

	$scope.$watch('dt', function (newValue) {
	    $scope.dt = $filter('date')(newValue, 'MMMM d y'); 
	});

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1,
		showWeeks: false
	};


//------add symptom------//

	$scope.symptom = '';

	var dataObj = {
			uid : $window.sessionStorage.userId,
			title : $scope.symptom,
			type: "page"

	};	

	$scope.addSymptom = function () {
		var postUrlBase = 'http://kevinnewman.ca/hypo/test/node';
		var res = $http.post(postUrlBase, dataObj);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		// Making the fields empty
		//
		$scope.symptom.title = '';
	}


});






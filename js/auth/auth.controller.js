app.controller('LoginCtrl',['$scope', '$window','$location', 'UserAuthFactory', 'AuthenticationFactory', 
	function($scope, $window,$location, UserAuthFactory, AuthenticationFactory){
		




		//----------LOGIN-------------//

		$scope.user = {
			username: 'admin',
			password: '1zx23cv4'
		};


		$scope.login = function(){
			var username = $scope.user.username,
				password = $scope.user.password;
			
				if(username !== undefined && password !== undefined){
						UserAuthFactory.login(username,password).success(function(data){
						AuthenticationFactory.isLogged = true;
						AuthenticationFactory.user = data.user.username;
							console.log(data);
						$window.sessionStorage.token = data.token;
						$window.sessionStorage.user = data.user.name;
						$window.sessionStorage.userId = data.user.uid;
						//$window.sessionStorage.Cookie = data.session_name + data.sessid;
							console.log($window.sessionStorage.userId);
						$scope.$apply(function() {
							$location.path("/tab/dash");
						});
					}).error(function(status){
						alert('Oops something went wrong');
					});
				}else{
					alert('invalid credentials');
				}
		};




		// -----------REGISTER---------------//


		$scope.registerUser = {
			name: '',
			pass: '',
			mail: '',

		};

	    $scope.register = function () {

	    	var newUsername = $scope.registerUser.username,
		    	newPassword = $scope.registerUser.password,
		    	newEmail = $scope.registerUser.email;

	    	
		    UserAuthFactory.register(newUsername,newPassword,newEmail).success(function(data){
		    	alert("registered user");

		    }).error(function(status){
				alert('Oops something went wrong');
			});
		    
		    	
	    };
	}
]);
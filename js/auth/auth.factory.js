app.factory('AuthenticationFactory', function($window){
	var auth = {
		isLogged:false,
		check:function(){
			if($window.sessionStorage.token && $window.sessionStorage.user){
				this.isLogged = true;
			}else{
				this.isLogged = false;
				delete this.user;
			}
		}
	};
	return auth;
});



app.factory('UserAuthFactory', function($window,$location,$http,AuthenticationFactory){
	return {
		register:function(newusername,newpassword,newemail){
			return $http.post('http://localhost:8100/test/test/user/',{
				name:newusername,
				pass:newpassword,
				mail:newemail
			});
		},

		login:function(username,password){
			return $http.post('http://localhost:8100/test/test/user/login',{
				username:username,
				password:password
			});
		},
		logout:function(){
			if(AuthenticationFactory.isLogged){
				AuthenticationFactory.isLogged = false;
				delete AuthenticationFactory.user;

				delete $window.sessionStorage.token;
				delete $window.sessionStorage.user;
				delete $window.sessionStorage.userId;
				console.log('logout');
				$location.path('/login');
			}
		}
	};
});

app.factory('TokenInterceptor', function($q, $window){
	return{
		request:function(config){
			config.headers = config.headers || {};
			if($window.sessionStorage.token){
				config.headers['X-CSRF-Token'] = $window.sessionStorage.token;
				config.headers['X-Key'] = $window.sessionStorage.user;
				config.headers['Content-Type'] = 'application/json';
			}
			return config || $q.when(config);
		},
		response: function(response){
			return response || $q.when(response);
		}
	};
});
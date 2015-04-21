
// List for All the 

app.factory('List', function($http, $q) {

  var juice = [];


  // var menus = $http.get('http://localhost:8100/test/node?parameters[uid]=1')
  var menus = $http.get('http://kevinnewman.ca/hypo/test/node?parameters[uid]=1')

  .success(function(data){
    juice = data;
    console.log(data);
  });

  return {
    all: function() {
      return menus;
    },

    get: function(menuId) {
      console.log(menuId);
      console.log(juice.length);


      for (var i = 0; i < juice.length; i++) {
        console.log(juice[i].juice_id);
        if (juice[i].juice_id == parseInt(menuId)) {
          return juice[i];
        }
      }
      return null;
    }
  }
});

app.factory('dataFactory', function($http, $window) {

  
  
  var timestamp = Math.round((new Date()).getTime() / 1000.0);
  var nonce = Math.random().toString(36).slice(2).substr(0,6);
  var comsumerKey = '6LfZHf8Wcpr4FGSaQEmL9o7BnkaDcgy5';
  var consumerSecret = 'wPogk3MnX9QQmEVhFdVvuY89CwVHEMxc';
  var callBackURL = 'oob';

  var baseSign = "GET" + "&" + encodeURIComponent("http://kevinnewman.ca/hypo/test/node/5").toString() + "&"
     + encodeURIComponent("oauth_callback") + "%3D" + encodeURIComponent(callBackURL)
     + "%26"
     + encodeURIComponent("oauth_consumer_key") + "%3D" + encodeURIComponent(comsumerKey)
     + "%26"
     + encodeURIComponent("oauth_nonce") + "%3D" + encodeURIComponent(nonce)
     + "%26"
     + encodeURIComponent("oauth_signature_method") + "%3D" + encodeURIComponent("HMAC-SHA1")
     + "%26"
     + encodeURIComponent("oauth_timestamp") + "%3D" + encodeURIComponent(timestamp)
     + "%26"
     + encodeURIComponent("oauth_version") + "%3D" + encodeURIComponent("1.0");

  var shaObj = new jsSHA(baseSign, "TEXT");
  var signature = encodeURIComponent(shaObj.getHMAC(comsumerKey + "&", "TEXT", "SHA-1", "B64"));

  console.log(shaObj + " comsumerKey");
  console.log(shaObj + " consumerSecret");
  console.log(nonce + " nonce");
  console.log(timestamp + " Timestamp");
  console.log(signature + " signature");

    //var getUrlBase = 'http://localhost:8100/test/test/node/5?oauth_consumer_key=' + comsumerKey + '&oauth_signature_method=HMAC-SHA1&oauth_timestamp=' + timestamp + '&oauth_nonce=' + nonce + '&oauth_version=1.0&oauth_signature=' + signature;
    //oauth http://kevinnewman.ca/hypo/test/node/5?oauth_consumer_key=6LfZHf8Wcpr4FGSaQEmL9o7BnkaDcgy5&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1427377724&oauth_nonce=zfhHpD&oauth_version=1.0&oauth_signature=BQaYKap1FKfYWQynARhjIBuNOQY=
    var getUrlBase = 'http://kevinnewman.ca/hypo/test/node?parameters[uid]=' + $window.sessionStorage.userId;
    //var getUrlBase = 'http://localhost:8100/test/test/articles/' + $window.sessionStorage.userId;

  var _symptomFactory = {};
 
  _symptomFactory.getSymptoms = function() {
    return $http.get(getUrlBase);
  };

  var postUrlBase = 'http://kevinnewman.ca/hypo/test/node?parameters[uid]=' + $window.sessionStorage.userId;

  _symptomFactory.addSymptom = function() {
    return $http.post(postUrlBase, {title:'test1'});
  }; 




  
  return _symptomFactory;
});
app.factory('Api', function($http, ApiEndpoint) {
  console.log('ApiEndpoint', ApiEndpoint)

  var getApiData = function() {
    return $http.get(ApiEndpoint.url + '/tasks')
      .then(function(data) {
        console.log('Got some data: ', data);
        return data;
      });
  };

  return {
    getApiData: getApiData
  };
})
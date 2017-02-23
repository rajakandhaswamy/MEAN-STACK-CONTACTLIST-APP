var app=angular.module("contactApp",[]);
app.controller("appControl",function($scope,$http) {
		$scope.itemPerPage = 3;
	$scope.currentPage = 1;
	
	$scope.prev = function () {
        $scope.currentPage = $scope.currentPage - 1;
    };

    $scope.next = function () {
        $scope.currentPage = $scope.currentPage + 1;
    };
	console.log("Hello World from Controller");
var refresh = function() {
	$http.get("/contactList")
			.then(function(response) {
					console.log("I got the data that I requested");
					$scope.contactList = response.data;
					$scope.contact = {};
				} 
)};
refresh();
$scope.addContact = function() {
		console.log($scope.contact);
		if(!$scope.contact){
			alert("Please Submit your details completely");
		}
		else if(!$scope.contact.name){
			alert("Please Enter your Name ");
		}else if(!$scope.contact.email){
			alert("Please Enter your Email ");
		}
		else if(!$scope.contact.number){
			alert("Please Enter your Number ");
		}else{

		$http.post("/contactList",$scope.contact)
			.then(function(response) {
				console.log(response.data);
				refresh();
			});

		}
	};
$scope.remove = function(id) {
	 console.log(id);
	 $http.delete("/contactList/"+id).then(function(response) {
	 	refresh();
	 })
}
$scope.edit =function(id) {
	console.log(id);
	
	$http.get("/contactList/"+id).then(function(response) {
	 	$scope.contact = response.data;
	 	console.log($scope.contact)
	 })
}

$scope.update = function () {
	console.log($scope.contact._id);
	$http.put("/contactList/"+$scope.contact._id , $scope.contact)
		.then( function(response) {
			refresh();
		})
}

$scope.deselect = function() {
	$scope.contact ={} ;
}
});


app.filter('startFrom', function () {
    return function (input, start) {
         if (!input || !input.length) { return; }
        start = +start;
        return input.slice(start);

    }
});

app.controller('myCtrl', function($scope, $http,) {
     requestData();
   
	function requestData() {
		$http({
		method: "GET",
		url: "http://localhost:800/data.json"
		}).then(function mySuccess(response){
			console.log("Sucess" + " " + response.statusText);
			$scope.myData = response.data;
		}, function myError(response) {
			console.log("error" + " " + response.statusText);
		});
	}

	$scope.upClick = function(parentI) {
		//var parentI = $(this).parent().attr("id");
		if(parentI == 0){
			console.log("Can't go up");
		}else{
			swap(-1, parentI);
		}
	};
	
	$scope.downClick = function(parentI) {
		//var parentI = $(this).parent().attr("id");
		if(parentI == ($scope.myData.length - 1) ){
			console.log("Can't go down");
		}else{
			swap(1, parentI);
		}
	};

	function swap(operation, id) {
		var new_Pos_Index = id + operation;
		var temp_Value = $scope.myData[new_Pos_Index];
		$scope.myData[new_Pos_Index] = $scope.myData[id];
		$scope.myData[id] = temp_Value;
		//updateServer();
	} 

	//update checkbox
	$scope.onCheck = function(index) {
		var title = $scope.myData[index].title;
		var checkbox = $scope.myData[index].check;
		console.log(title + " " + checkbox);
	}
		
	
});
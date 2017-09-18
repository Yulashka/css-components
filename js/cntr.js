app.controller('myCtrl', function($scope) {
    $scope.myData = requestData();

	//requestData();
	function requestData() {
		//$http.hfjf instead
		return [
	    	{ title : "Reading a book",
	    	  check: false },
	    	{ title : "Riding a bike",
	    	  check: false },
	    	{ title : "Baking a pie",
	    	  check: false }
		];
	}
	$scope.upClick = function(parentI) {
		//var parentI = $(this).parent().attr("id");
		swap(-1, parentI);
	};
	
	$scope.downClick = function(parentI) {
		//var parentI = $(this).parent().attr("id");
		swap(1, parentI);
	};
	
	function swap(operation, id) {
		var new_Pos_Index = id + operation;
		var temp_Value = $scope.myData[new_Pos_Index];
		$scope.myData[new_Pos_Index] = $scope.myData[id];
		$scope.myData[id] = temp_Value;
		//updateServer();
	} 
});
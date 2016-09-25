var app = angular.module('app', []);

app.controller('salesCtlr', function($scope){
	$scope.$on('numberSalesPeople',function(obj, num){
		$scope.totalSalesPeople = num;
	});
	$scope.$on('numberRegions', function(obj, num){
		$scope.numberRegions = num;
	});
	
}); 

app.controller('regionCtlr',function($scope, $rootScope){
	$scope.regions = [
		{id: 1, zipcode: '10530'},
		{id: 2, zipcode: '12345'},
		{id: 3, zipcode: '67890'},
	];
	$rootScope.$broadcast('numberRegions', $scope.regions.length)

	$scope.destroy = function(region){
		var idx = $scope.regions.indexOf(region);
		$scope.regions.splice(idx,1);
		$rootScope.$broadcast('numberRegions', $scope.regions.length);
	};

	$scope.create = function(region){
		var max = $scope.regions.reduce(function(mem, region){
			if(region.id > mem)
				mem = region.id;
			return mem;
		}, 0)
		$scope.regions.push({id: ++max, zipcode: $scope.zipcode});
		console.log($scope.regions)
		$scope.zipcode = '';
		$rootScope.$broadcast('numberRegions', $scope.regions.length);
	}
});

app.controller('salesPersonCtlr', function($scope, $rootScope){
	$scope.salesPeople = [
		{id: 1, name: 'mo'},
		{id: 2, name: 'larry'},
		{id: 3, name: 'curly'},
	];

	$rootScope.$broadcast('numberSalesPeople', $scope.salesPeople.length)

	$scope.destroy = function(salesPerson){
		var idx = $scope.salesPeople.indexOf(salesPerson);
		$scope.salesPeople.splice(idx,1);
		$rootScope.$broadcast('numberSalesPeople',$scope.salesPeople.length);
	};

	$scope.create = function(){
		var max = $scope.salesPeople.reduce(function(memo, salesPerson){
			if(salesPerson.id > memo)
				memo = salesPerson.id;
			return memo;
		}, 0);
		$scope.salesPeople.push({ id: ++max, name: $scope.name });
		$rootScope.$broadcast('numberSalesPeople',$scope.salesPeople.length);
		$scope.name = '';
	}

})


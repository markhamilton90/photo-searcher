
angular.module('PhotoSearch', [])
	.controller('searchCtrl', function($scope, $http, $q, $timeout) {

		$scope.flickr = function(query) {

			$scope.status = query;

			var url = "https://api.flickr.com/services/feeds/photos_public.gne";

			var requestOptions = {
				tags: $scope.query,
				format: "json",
				jsoncallback: "JSON_CALLBACK"
			};

			$http({
				method: 'JSONP',
				url: url,
				params: requestOptions
			})
			.then( function(response) {
				$scope.loading = true;
				$timeout(function() {
					console.log('Success!');
					console.log(response);
					$scope.photos = response.data.items;
					$scope.loading = false;
					$scope.query = "";
				}, 1000);
				
			}, 
			function(response) {
				console.log('Failure...');
				$scope.query = "";
			});
		};

		/*
		$scope.searchQuery = function() {

			var request = {
				callback: 'JSON_CALLBACK',
				format: "json",
				client_id: 'a01b4dd2fa124aa6942dd35c22763e88',
			}

			$http({
				url: "https://api.instagram.com/v1/tags/" + $scope.query + "/media/recent",
				method: 'JSONP',
				params: request
			})
			.then( function(request) {
				console.log('Success!');
				console.log(request.data);
			}, function() {
				console.log('Failure...');
			});
		} */

	});
(function() {
	angular
		.module("TravelApp")
		.service("GoogleService", GoogleService);

	function GoogleService($http, $sce) {

		var googleConfig = {
			placesKey: 'AIzaSyBynPLVkqYKWTGTvUC6mRkOBRDqizpi5Wc',
			mapsKey: 'AIzaSyCebQiQ_1nj4lq3jcvTtg0OE04ynAt8uxY'
		}

		var api = {
			"getPhoto": getPhoto,
			"generateMap": generateMap
		}
		return api;

		function getPhoto(photoRef, maxWidth) {
			var url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=MAX_WIDTH&photoreference=PHOTO_REFERENCE&key=API_KEY'
			url = url
					.replace('MAX_WIDTH', maxWidth)
					.replace('PHOTO_REFERENCE', photoRef)
					.replace('API_KEY', googleConfig.placesKey);
			return $http.get(url)
				.then(function(response) {
					return response.data;
				})
		}

		function generateMap() {
			var url ='https://maps.googleapis.com/maps/api/js?key=API_KEY';
			url = url.replace("API_KEY", googleConfig.mapsKey);
			return $http.get(url)
				.then(function(response) {
					return response.data;
				}, function(err) {});
		}
	}
})();
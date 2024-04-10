// #1. Defs
let distanceMatrixService;
let map;
let originMarker;
let infowindow;
let circles = [];
let stores = [];

// #1.2 The location of Austin, TX
const AUSTIN = { lat: 30.262129, lng: -97.7468 };

// #2. Funtions

// #2.1 Map: async
async function initialize() {
	initMap();

	// #2.1.1 TODO: Initialize an infoWindow

	// #2.1.2 Fetch and render stores as circles on map
	fetchAndRenderStores(AUSTIN);

	// #2.1.3 TODO: Initialize the Autocomplete widget
}

// #3.1 Map: function
const initMap = () => {
	// #3.1.1 TODO: Start Distance Matrix service

	// #3.1.2 The map, centered on Austin, TX
	map = new google.maps.Map(document.querySelector("#map"), {
		center: AUSTIN,
		zoom: 14,
		// #3.1.3 mapId: 'YOUR_MAP_ID_HERE',
		clickableIcons: false,
		fullscreenControl: false,
		mapTypeControl: false,
		rotateControl: true,
		scaleControl: false,
		streetViewControl: true,
		zoomControl: true,
	});
};

// #3.2 Map: fetch
const fetchAndRenderStores = async (center) => {
	// #3.2.1 Fetch the stores from the data source
	stores = (await fetchStores(center)).features;

	// #3.2.2 Create circular markers based on the stores
	circles = stores.map((store) => storeToCircle(store, map));
};

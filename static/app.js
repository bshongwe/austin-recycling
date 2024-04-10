// #1. Defs
let distanceMatrixService;
let map;
let originMarker;
let infowindow;
let circles = [];
let stores = [];

// #1.2 The location of Austin, TX
const AUSTIN = { lat: 30.262129, lng: -97.7468 };

// Step 6:
// Add an info window that pops up when user clicks on an individual
// location. Content of info window is entirely up to us.
infowindow = new google.maps.InfoWindow();

// Step 7:
// Initialize the Places Autocomplete Widget
initAutocompleteWidget();

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
	// circles = stores.map((store) => storeToCircle(store, map));
	// Step 6 Update
	circles = stores.map((store) => storeToCircle(store, map, infowindow));
};

// #3.3 Map: store to circle
// Step 6 update - check Git Version
const storeToCircle = (store, map, infowindow) => {
	const [lng, lat] = store.geometry.coordinates;
	const circle = new google.maps.Circle({
		radius: 50,
		strokeColor: "#579d42",
		strokeOpacity: 0.8,
		strokeWeight: 5,
		center: { lat, lng },
		map,
	});
	circle.addListener("click", () => {
		infowindow.setContent(`${store.properties.business_name}<br />
      ${store.properties.address_address}<br />
      Austin, TX ${store.properties.zip_code}`);
		infowindow.setPosition({ lat, lng });
		infowindow.setOptions({ pixelOffset: new google.maps.Size(0, -30) });
		infowindow.open(map);
	});
	return circle;
};

// Step 7: Autocomplet widget
const initAutocompleteWidget = () => {
	// Add search bar for auto-complete
	// Build and add the search bar
	const placesAutoCompleteCardElement = document.getElementById("pac-card");
	const placesAutoCompleteInputElement = placesAutoCompleteCardElement.querySelector(
		"input"
	);
	const options = {
		types: ["address"],
		componentRestrictions: { country: "us" },
		map,
	};
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
		placesAutoCompleteCardElement
	);
	// Make the search bar into a Places Autocomplete search bar and select
	// which detail fields should be returned about the place that
	// the user selects from the suggestions.
	const autocomplete = new google.maps.places.Autocomplete(
		placesAutoCompleteInputElement,
		options
	);
	autocomplete.setFields(["address_components", "geometry", "name"]);
	map.addListener("bounds_changed", () => {
		autocomplete.setBounds(map.getBounds());
	});

	// TODO: Respond when a user selects an address
};

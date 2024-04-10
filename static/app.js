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

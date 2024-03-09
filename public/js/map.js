
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates, // [lng,lat]
    zoom: 9,
});

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .addTo(map);
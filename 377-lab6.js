var map = L.map('map').setView([39, -98], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const lat1 = getRandomInRange(30, 35, 3);
const long1 = getRandomInRange(-100, -90, 3);
const lat2 = getRandomInRange(30, 35, 3);
const long2 = getRandomInRange(-100, -90, 3);
const lat3 = getRandomInRange(30, 35, 3);
const long3 = getRandomInRange(-100, -90, 3);

function addMarkerAndFetchLocality(lat, long, markerId, elementId) {
    const marker = L.marker([lat, long]).addTo(map);
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || 'Unknown Location';
            marker.bindPopup(`Marker ${markerId}: ${locality}`).openPopup();
            document.getElementById(elementId).innerHTML = 
            `<span class="marker-info">Marker ${markerId}: Latitude: ${lat}, Longitude: ${long}</span><br>
            <span class="locality-info">Locality: ${locality}</span>`;

        })
        .catch(error => console.error('Error fetching locality:', error));
}

addMarkerAndFetchLocality(lat1, long1, 1, 'marker1');
addMarkerAndFetchLocality(lat2, long2, 2, 'marker2');
addMarkerAndFetchLocality(lat3, long3, 3, 'marker3');

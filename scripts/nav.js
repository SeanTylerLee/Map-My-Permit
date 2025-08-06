// Example geocoding function (placeholder)
async function fakeGeocode(routeLines) {
  const fakePoints = {
    "US-69": [35.435, -94.396],
    "I-40": [35.4676, -97.5164],
    "I-44": [36.154, -95.9928],
    "US-75": [36.13, -95.9]
  };

  const points = [];

  for (const line of routeLines) {
    for (const key in fakePoints) {
      if (line.includes(key)) {
        points.push(fakePoints[key]);
        break;
      }
    }
  }

  // Fallback dummy path
  if (points.length < 2) {
    points.push([35.435, -94.396]);
    points.push([35.4676, -97.5164]);
  }

  return points;
}

// Load route from localStorage
const routeText = JSON.parse(localStorage.getItem("parsedRoute") || "[]");
document.getElementById("routeInstructions").textContent = routeText.join('\n');

// Initialize Leaflet map
const map = L.map('map').setView([35.5, -97.5], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

// Simulate geocoding and draw route
fakeGeocode(routeText).then(points => {
  if (points.length > 0) {
    L.polyline(points, { color: 'blue', weight: 5 }).addTo(map);
    map.fitBounds(L.polyline(points).getBounds());

    points.forEach(([lat, lon]) => {
      L.circleMarker([lat, lon], { radius: 5, color: 'red' }).addTo(map);
    });
  }
});
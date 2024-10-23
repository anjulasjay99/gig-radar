function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const toRad = (angle) => (angle * Math.PI) / 180; // Converts degrees to radians

  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Function to check if the shop is within the range
export function isEventWithinRange(
  userLat,
  userLon,
  eventLat,
  eventLon,
  rangeKm
) {
  const distance = haversineDistance(userLat, userLon, eventLat, eventLon);
  return distance <= rangeKm;
}

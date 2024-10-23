const MAX_DISTANCE_KM = 10; // Maximum allowed distance in kilometers

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusKm * c;
}

export function verifyLocation(reportedLat: number, reportedLon: number, userLat: number, userLon: number): boolean {
  const distance = calculateDistance(reportedLat, reportedLon, userLat, userLon);
  return distance <= MAX_DISTANCE_KM;
}
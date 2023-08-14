module.exports = function calculateDistance(latString1, lonString1, latString2, lonString2) {
  if (latString1 && lonString1 && lonString1 && lonString2) {
    const earthRadius = 6371;
    const lat1 = Number(latString1);
    const lat2 = Number(latString2);
    const lon1 = Number(lonString1);
    const lon2 = Number(lonString2);
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = Math.floor(earthRadius * c);
    return distance;
  }
  return null;
};


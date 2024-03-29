// src/services/priceCalculator.js
const calculatePrice = (pricing, total_distance) => {
  let totalPriceCents = pricing.base_price * 100; // Convert euros to cents

  if (total_distance > pricing.base_distance_in_km) {
    const extraDistance = total_distance - pricing.base_distance_in_km;
    totalPriceCents += extraDistance * pricing.km_price * 100; // Convert euros to cents
  }

  return totalPriceCents;
};

module.exports = { calculatePrice };

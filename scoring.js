/**
 * Algorithme de scoring pour le matching ambassadeur-campagne
 * Score total sur 100 points basé sur 5 critères
 */

/**
 * Calcule le score de correspondance entre un ambassadeur et une campagne
 * 
 * @param {Object} ambassador - Profil ambassadeur
 * @param {Object} campaign - Détails de la campagne
 * @returns {Object} Score total et détails par critère
 */
function calculateScore(ambassador, campaign) {
  let zoneScore = 0;
  let vehicleScore = 0;
  let historyScore = 0;
  let frequencyScore = 0;
  let interestScore = 0;

  // 1. ZONE GÉOGRAPHIQUE (30 points)
  const ambassadorZones = JSON.parse(ambassador.zones || '[]');
  const campaignZones = JSON.parse(campaign.zones || '[]');
  
  if (campaignZones.length > 0 && ambassadorZones.length > 0) {
    const matchingZones = ambassadorZones.filter(zone => 
      campaignZones.includes(zone)
    );
    const matchRatio = matchingZones.length / campaignZones.length;
    zoneScore = Math.round(matchRatio * 30);
  }

  // 2. TYPE DE VÉHICULE (20 points)
  const targetVehicleTypes = JSON.parse(campaign.target_vehicle_types || '[]');
  
  if (targetVehicleTypes.length > 0 && ambassador.vehicle_type) {
    if (targetVehicleTypes.includes(ambassador.vehicle_type)) {
      vehicleScore = 20;
    }
  } else if (targetVehicleTypes.length === 0) {
    // Si pas de critère, score moyen
    vehicleScore = 10;
  }

  // 3. HISTORIQUE/PERFORMANCE (20 points)
  // Basé sur le score ambassadeur (0-5 étoiles)
  const ambassadorRating = ambassador.score || 0;
  historyScore = Math.round((ambassadorRating / 5) * 20);

  // 4. FRÉQUENCE DE DÉPLACEMENT (15 points)
  const frequencyMap = {
    'daily': 15,
    '3-5x/week': 12,
    '1-2x/week': 8,
    'occasional': 5
  };
  frequencyScore = frequencyMap[ambassador.frequency] || 0;

  // 5. CENTRES D'INTÉRÊTS (15 points)
  const ambassadorInterests = JSON.parse(ambassador.interests || '[]');
  const targetInterests = JSON.parse(campaign.target_interests || '[]');
  
  if (targetInterests.length > 0 && ambassadorInterests.length > 0) {
    const matchingInterests = ambassadorInterests.filter(interest => 
      targetInterests.includes(interest)
    );
    const interestRatio = matchingInterests.length / targetInterests.length;
    interestScore = Math.round(interestRatio * 15);
  }

  // SCORE TOTAL
  const totalScore = zoneScore + vehicleScore + historyScore + frequencyScore + interestScore;

  return {
    total: totalScore,
    zoneScore,
    vehicleScore,
    historyScore,
    frequencyScore,
    interestScore
  };
}

/**
 * Calcule les scores pour plusieurs ambassadeurs
 * 
 * @param {Array} ambassadors - Liste des ambassadeurs
 * @param {Object} campaign - Détails de la campagne
 * @returns {Array} Ambassadeurs avec leurs scores triés par ordre décroissant
 */
function calculateMultipleScores(ambassadors, campaign) {
  return ambassadors
    .map(ambassador => {
      const scoreDetails = calculateScore(ambassador, campaign);
      return {
        ...ambassador,
        matching_score: scoreDetails.total,
        score_details: scoreDetails
      };
    })
    .sort((a, b) => b.matching_score - a.matching_score); // Trier du meilleur au moins bon
}

module.exports = {
  calculateScore,
  calculateMultipleScores
};

import moment from "moment";

/**
 * Retourne une durée lisible entre une date donnée et aujourd’hui
 * @param {string|Date} date - La date à comparer (ex: "2024-12-01" ou new Date())
 * @returns {string} - ex: "il y a 3 heures", "il y a 2 jours", "il y a 5 mois", "2023"
 */
export function formatTimeDifference(date) {
  const now = moment();
  const givenDate = moment(date);

  if (!givenDate.isValid()) {
    return "Date invalide";
  }

  const diffHours = now.diff(givenDate, "hours");
  const diffDays = now.diff(givenDate, "days");
  const diffMonths = now.diff(givenDate, "months");
  const diffYears = now.diff(givenDate, "years");

  if (diffYears >= 1) {
    // Si plus d’un an, on renvoie juste l’année
    return givenDate.format("YYYY");
  } else if (diffMonths >= 1) {
    return `${diffMonths} mois`;
  } else if (diffDays >= 1) {
    return `${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  } else if (diffHours >= 1) {
    return `${diffHours} heure${diffHours > 1 ? "s" : ""}`;
  } else {
    return "quelques minutes";
  }
}

/** @typedef {import("./types").Ticketing} */
const ticketing = {
  comment:
    "inclut le petit-déjeuner, le repas le midi et le café pour la journée",
  url: "https://my.weezevent.com/devfest-dijon-2023",
  pricings: [
    {
      id: "early",
      name: "Tarif Early",
      price: "25 €",
      comment: "Seulement 100 places !",
    },
    {
      id: "standard",
      name: "Tarif standard",
      price: "35 €",
    },
    {
      id: "etudiant",
      name: "Tarif étudiant",
      price: "20 €",
      comment: "Une pièce-justificative pourra être demandée",
    },
  ],
};

module.exports = ticketing;

import axios from "axios";

const API_KEY = "725ce3911bac43db891bd45e3366acb7";
const BASE_URL = "https://api.spoonacular.com/recipes";

class RicetteAPI {
  /**
   * Cerca ricette vegetariane e vegane
   * @param {string} query - Termine di ricerca
   * @returns {Promise<Array>} Lista delle ricette
   */
  async cercaRicette(query) {
    if (!query || typeof query !== "string" || query.trim() === "") {
      throw new Error("Query di ricerca non valida");
    }

    const params = {
      apiKey: API_KEY,
      query: query.trim(),
      number: "10",
      addRecipeInformation: "true",
      diet: "vegetarian,vegan",
    };

    try {
      const response = await axios.get(`${BASE_URL}/complexSearch`, { params });
      return response.data.results || [];
    } catch (ex) {
      throw new Error("Errore durante la ricerca delle ricette: " + ex.message);
    }
  }

  /**
   * Ottiene i dettagli di una ricetta specifica
   * @param {string|number} ricettaId - ID della ricetta
   * @returns {Promise<Object>} Dettagli della ricetta
   */
  async ottieniDettaglioRicetta(ricettaId) {
    if (!ricettaId) {
      throw new Error("ID ricetta non valido");
    }

    const params = {
      apiKey: API_KEY,
      includeNutrition: true,
    };

    try {
      const response = await axios.get(`${BASE_URL}/${ricettaId}/information`, {
        params,
      });
      return response.data;
    } catch (ex) {
      throw new Error("Errore durante il caricamento della ricetta: " + ex.message);
    }
  }
}

// Esporto un'istanza singleton
export const ricetteAPI = new RicetteAPI();

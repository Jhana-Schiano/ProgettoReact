import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ricetteAPI } from "../services/ricetteAPI";

/**
 * Slice Redux per la gestione dello stato delle ricette e della loro ricerca
 */
const ricetteSlice = createSlice({
  name: "ricette",
  initialState: {
    // Stato per la ricerca
    queryRicerca: "",
    risultatiRicerca: [],
    caricamentoRicerca: false,
    erroreRicerca: null,
    offsetRicerca: 0,
    hasMoreResults: true,

    // Stato per il dettaglio
    ricettaSelezionata: null,
    caricamentoDettaglio: false,
    erroreDettaglio: null,
  },
  extraReducers: (builder) => {
    builder
      // Gestione ricerca ricette
      .addCase(cercaRicette.pending, (state) => {
        state.caricamentoRicerca = true;
        state.erroreRicerca = null;
      })
      .addCase(cercaRicette.fulfilled, (state, action) => {
        state.caricamentoRicerca = false;
        const { results, appendResults, query, offset } = action.payload;

        if (appendResults) {
          // Carica altro: aggiungi ai risultati esistenti
          state.risultatiRicerca = [...state.risultatiRicerca, ...results];
        } else {
          // Nuova ricerca: sostituisci i risultati
          state.risultatiRicerca = results;
          state.queryRicerca = query;
        }

        state.offsetRicerca = offset + 10;
        state.hasMoreResults = results.length === 10;
      })
      .addCase(cercaRicette.rejected, (state, action) => {
        state.caricamentoRicerca = false;
        state.erroreRicerca = action.payload || "Errore durante la ricerca";

        // Solo per nuove ricerche, non per carica altro
        if (!action.meta.arg.appendResults) {
          state.offsetRicerca = 0;
          state.hasMoreResults = false;
        }
      })

      // Gestione dettaglio ricetta
      .addCase(ottieniDettaglioRicetta.pending, (state) => {
        state.caricamentoDettaglio = true;
        state.erroreDettaglio = null;
      })
      .addCase(ottieniDettaglioRicetta.fulfilled, (state, action) => {
        state.caricamentoDettaglio = false;
        state.ricettaSelezionata = action.payload;
      })
      .addCase(ottieniDettaglioRicetta.rejected, (state, action) => {
        state.caricamentoDettaglio = false;
        state.erroreDettaglio =
          action.payload || "Errore nel caricamento del dettaglio";
      });
  },
});

/**
 * Metodo per cercare ricette con supporto alla paginazione
 */
export const cercaRicette = createAsyncThunk(
  "ricette/cercaRicette",
  async ({ query, offset = 0, appendResults = false }, { rejectWithValue }) => {
    try {
      const results = await ricetteAPI.cercaRicette(query, offset);
      return { results, appendResults, query, offset };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Metodo per ottenere il dettaglio di una ricetta specifica
 */
export const ottieniDettaglioRicetta = createAsyncThunk(
  "ricette/ottieniDettaglioRicetta",
  async (ricettaId, { rejectWithValue }) => {
    try {
      return await ricetteAPI.ottieniDettaglioRicetta(ricettaId);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default ricetteSlice.reducer;

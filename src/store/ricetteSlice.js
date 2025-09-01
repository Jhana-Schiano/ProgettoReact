import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ricetteAPI } from "../services/ricetteAPI";

export const cercaRicette = createAsyncThunk(
  "ricette/cercaRicette",
  async ({ query }, { rejectWithValue }) => {
    try {
      return await ricetteAPI.cercaRicette(query);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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

const ricetteSlice = createSlice({
  name: "ricette",
  initialState: {
    // Stato per la ricerca
    queryRicerca: "",
    risultatiRicerca: [],
    caricamentoRicerca: false,
    erroreRicerca: null,

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
        state.risultatiRicerca = action.payload;
      })
      .addCase(cercaRicette.rejected, (state, action) => {
        state.caricamentoRicerca = false;
        state.erroreRicerca = action.payload || "Errore durante la ricerca";
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

export default ricetteSlice.reducer;

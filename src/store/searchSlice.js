import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "https://api.spoonacular.com/recipes/complexSearch";

export const fetchRecipes = createAsyncThunk(
  "search/fetchRecipes",
  async ({ query }, { rejectWithValue }) => {
    try {
      if (!query || typeof query !== "string" || query.trim() === "") {
        return rejectWithValue("Query di ricerca non valida");
      }

      const apiKey = "725ce3911bac43db891bd45e3366acb7";
      const params = {
        apiKey,
        query: query.trim(),
        number: "10",
        addRecipeInformation: "true",
        diet: "vegetarian,vegan",
      };

      const response = await axios.get(API_BASE, { params });
      return response.data.results || [];
    } catch (ex) {
      return rejectWithValue(`Errore durante la chiamata: ${ex.message}`);
    }
  }
);

export const fetchRecipeDetail = createAsyncThunk(
  "search/fetchRecipeDetail",
  async (recipeId, { rejectWithValue }) => {
    try {
      const apiKey = "725ce3911bac43db891bd45e3366acb7";
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/information`,
        {
          params: {
            apiKey,
            includeNutrition: true,
          },
        }
      );
      return response.data;
    } catch (ex) {
      console.error("Errore fetchRecipeDetail:", ex);
      if (ex.response) {
        return rejectWithValue(
          `Errore HTTP: ${ex.response.status} - ${
            ex.response.data?.message || "Errore del server"
          }`
        );
      }
      return rejectWithValue(ex.message || "Errore di rete");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: [],
    loading: false,
    error: null,
    // Stato per il dettaglio della ricetta
    selectedRecipe: null,
    detailLoading: false,
    detailError: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          action.error?.message ||
          "Errore sconosciuto durante la ricerca";
        console.error("Richiesta rifiutata:", action);
      })
      .addCase(fetchRecipeDetail.pending, (state) => {
        state.detailLoading = true;
        state.detailError = null;
      })
      .addCase(fetchRecipeDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.selectedRecipe = action.payload;
      })
      .addCase(fetchRecipeDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.detailError =
          action.payload || "Errore nel caricamento del dettaglio";
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;

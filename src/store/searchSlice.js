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
    }
    catch (ex) {
      return rejectWithValue(`Errore durante la chiamata: ${ex.message}`);
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
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;

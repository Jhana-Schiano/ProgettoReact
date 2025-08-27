import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE = "https://api.spoonacular.com/recipes/complexSearch";

export const fetchRecipes = createAsyncThunk(
  "search/fetchRecipes",
  async ({ query, diet }, { rejectWithValue }) => {
    const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;
    if (!apiKey) return rejectWithValue("API key mancante");
    const params = new URLSearchParams({
      apiKey,
      query,
      number: "12",
      addRecipeInformation: "true",
    });
    if (diet) params.append("diet", diet);

    const res = await fetch(`${API_BASE}?${params.toString()}`);
    if (!res.ok) return rejectWithValue("Errore API");
    const data = await res.json();
    return (data.results || []).filter((r) => r.vegan || r.vegetarian);
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
        state.error = action.payload || "Errore sconosciuto";
      });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;

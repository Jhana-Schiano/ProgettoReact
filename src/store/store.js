import { configureStore } from "@reduxjs/toolkit";
import ricetteReducer from "./ricetteSlice";

export const store = configureStore({
  reducer: {
    ricette: ricetteReducer,
  },
});

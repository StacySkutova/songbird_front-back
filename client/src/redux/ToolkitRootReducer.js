import { combineReducers, configureStore } from "@reduxjs/toolkit";

import birdReducer from "src/redux/ToolkitSongbirdReducer";

const toolkitRootReducer = combineReducers({
  songbird: birdReducer,
});

export const store = configureStore({
  reducer: toolkitRootReducer,
});

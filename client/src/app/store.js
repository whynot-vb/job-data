import { configureStore } from "@reduxjs/toolkit";

import jobReducer from "../reducers/jobReducer";
import authReducer from "../reducers/authReducer";

export const store = configureStore({
  reducer: {
    users: authReducer,
    jobs: jobReducer,
  },
});

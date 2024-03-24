import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { allUserReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
  user: userSlice,
  allUsers: allUserReducer
});

export { rootReducer };

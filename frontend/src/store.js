import { createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  form: formReducer,
  // Add other reducers if needed
});

const store = createStore(rootReducer);

export default store;

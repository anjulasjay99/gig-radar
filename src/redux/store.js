import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import gigRadarReducer from "./reducers";
import { legacy_createStore as createStore } from "redux";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, gigRadarReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

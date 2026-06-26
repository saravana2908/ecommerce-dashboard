
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  createMigrate,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from "redux-persist";
import authReducer from "../features/auth/authSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import cartReducer from "../features/cart/cartSlice";
import searchReducer from "../features/search/searchSlice";
import themeReducer from "../features/themecolor/themeSlice";
import  {api } from "../services/api";
 
// ── Vite-compatible localStorage wrapper ─────────
const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const migrations = {
  0: (state) => state,
  1: (state) => state,
};
 
// ── Persist configs ──────────────────────────────
const authPersistConfig = {
  key: "auth",
  storage,
  version: 1,
  migrate: createMigrate(migrations, { debug: false }),
  whitelist: ["user", "isLoggedIn"],
};

const wishlistPersistConfig = {
  key: "wishlist",
  storage,
  version: 1,
  migrate: createMigrate(migrations, { debug: false }),
  whitelist: ["items"],
};

const themePersistConfig = {
  key: "theme",
  storage,
  version: 1,
  migrate: createMigrate(migrations, { debug: false }),
  whitelist: ["mode"],
};
// ── Persisted reducers ───────────────────────────
const persistedAuthReducer     = persistReducer(authPersistConfig,     authReducer);
const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer);
const persistedThemeReducer    = persistReducer(themePersistConfig,    themeReducer);
 
// ── Store ────────────────────────────────────────
export const store = configureStore({
  reducer: {
    auth:     persistedAuthReducer,
    wishlist: persistedWishlistReducer,
    theme:    persistedThemeReducer,
    cart:     cartReducer,
    search:   searchReducer,
    [api.reducerPath]: api.reducer,
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});
 
export const persistor = persistStore(store);
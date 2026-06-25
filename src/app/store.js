
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
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
 
// ── Persist configs ──────────────────────────────
const authPersistConfig     = { key: "auth",     storage };
const wishlistPersistConfig = { key: "wishlist", storage };
const themePersistConfig    = { key: "theme",    storage };
 
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
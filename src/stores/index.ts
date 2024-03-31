// Assuming you have a rootReducer that combines all your reducers
import rootReducer from '../reducers';
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import storageMiddleware from './storageMiddleware';


// Define RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Load initial state from localStorage if it exists
const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState')!)
  : {};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false,
    });

    return [...defaultMiddleware, storageMiddleware];
  },

});

export default store;

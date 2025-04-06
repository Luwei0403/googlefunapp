import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import attractionsReducer from './reducers/attractionsReducer';
import favoritesReducer from './reducers/myfavReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorites'],
};

const rootReducer = combineReducers({
  attractions: attractionsReducer,
  favorites: favoritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);
export {store, persistor};

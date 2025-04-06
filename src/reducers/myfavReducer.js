import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'favorites', // 本地存儲的 key
  storage: AsyncStorage, // 存到 AsyncStorage
};

//  Redux Slice
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload); //更新更新favorites: []
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        item => item.caseId !== action.payload,
      );
    },
    resetFavorites: state => {
      state.favorites = []; // 清除收藏
    },
  },
});

//  包裝 `persistReducer`，讓這個 slice 永久化
const persistedFavoritesReducer = persistReducer(
  persistConfig,
  favoritesSlice.reducer,
);

export const {addFavorite, removeFavorite, resetFavorites} =
  favoritesSlice.actions;
export default persistedFavoritesReducer;

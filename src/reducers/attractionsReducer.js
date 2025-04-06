import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  attractions: [],
};

export const Attractions = createSlice({
  name: 'attractions',
  initialState, //JavaScript的物件屬性名稱和變數名稱相同時，可以簡寫
  reducers: {
    SET_ATTRACTIONS: (state, action) => {
      state.attractions = action.payload ?? []; // ?? 只有null 或 undefined才會啟動
    },
    resetToInitialState: () => initialState,
  },
});

export const {SET_ATTRACTIONS, resetToInitialState} = Attractions.actions;
export default Attractions.reducer;

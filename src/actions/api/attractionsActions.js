import axios from 'axios';

export const GET_Attractions = async () => {
  try {
    const response = await axios.get(
      'https://data.boch.gov.tw/opendata/v2/assetsCase/3.1.json',
    );
    return response.data;
  } catch (error) {
    console.error('獲取景點資料時發生錯誤:', error);
    return []; //遇錯誤回傳空陣列，避免 undefined
  }
};

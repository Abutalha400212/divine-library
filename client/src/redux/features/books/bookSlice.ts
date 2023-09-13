import { IBook } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
  book: IBook | null;
  wishlist: IBook | null;
}

const initialState: IProduct = {
  book: null,
  wishlist: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setBook: (state, action: PayloadAction<IBook>) => {
      state.book = action.payload;
    },
  },
});

export const { setBook } = productSlice.actions;

export default productSlice.reducer;

import { toast } from '@/components/ui/use-toast';
import { IBook } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IWishlist {
  wishlist: IBook[];
}

const initialState: IWishlist = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<IBook>) => {
      const existing = state.wishlist.find(
        (book) => book._id === action.payload._id
      );
      if (!existing) {
        state.wishlist.push(action.payload);
      } else {
        toast({
          description: 'Book already add to wishlist',
        });
        throw Error('');
      }
    },

    removeFromWishlist: (state, action: PayloadAction<IBook>) => {
      state.wishlist = state.wishlist.filter(
        (book) => book._id !== action.payload._id
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

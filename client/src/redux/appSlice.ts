import axios from 'axios';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PointOnEarth } from '../utils/constants';
import { RootState, AppThunk } from './store';
import Bank from './Bank';
import { transformBanksForDisplay } from '../utils/helpers';

export interface AppState {
  userLocation: PointOnEarth;
  isFetchingBanks: boolean;
  banks: Bank[];
}

const initialState: AppState = {
  userLocation: { latitude: 0, longitude: 0 },
  isFetchingBanks: false,
  banks: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUserLocation: (state, action: PayloadAction<PointOnEarth>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userLocation = action.payload;
    },
    setIsFetchingBanks: (state, action: PayloadAction<boolean>) => {
      state.isFetchingBanks = action.payload
    },
    setBanks: (state, action: PayloadAction<any[]>) => {
      state.banks = action.payload;
    },

  },
});

export const { setUserLocation, setBanks, setIsFetchingBanks } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserLocation = (state: RootState) => state.app.userLocation;
export const selectBanks = (state: RootState) => state.app.banks;
export const selectIsFetchingBanks = (state: RootState) => state.app.isFetchingBanks;

// Custom selectors
export const selectUserLocationIsSet = (state: RootState) => {
  const { latitude, longitude } = state.app.userLocation;
  return latitude !== 0 && longitude !== 0;
};

export const selectUserCoordinates = (state: RootState): [number, number] => {
  const { latitude, longitude } = state.app.userLocation;
  return [latitude, longitude];
};

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const fetchBanks = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsFetchingBanks(true))

  const userLocation = selectUserLocation(getState());
  const { latitude, longitude } = userLocation;

  let url = `/api/bank/near/${latitude}/${longitude}`;
  if (process.env.NODE_ENV === 'development') {
    url = 'http://localhost:5000' + url;
  }

  try {
    let data = await axios.get<Bank[]>(url);
    dispatch(setBanks(transformBanksForDisplay(userLocation , data.data)))
  } catch (error) {
    console.log("Need to handle this error!");

  } finally {
    dispatch(setIsFetchingBanks(false))
  }
};

export default appSlice.reducer;

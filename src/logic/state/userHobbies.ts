import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Hobby from '../../core/types/Hobby.interface';

export interface UserHobbiesState {
    userId: string,
    hobbies: Hobby[],
    loading: boolean,
    error: string
}

const initialState: UserHobbiesState = {
    userId: '',
    hobbies: [],
    loading: false,
    error: ''
};

export const userHobbiesSlice = createSlice({
    name: 'userHobbies',
    initialState,
    reducers: {
        requestUser: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
            state.loading = true;
        },
        requestAddHobby: (state, action: PayloadAction<Hobby>) => {
            state.loading = true;
        },
        requestDeleteHobby: (state, action: PayloadAction<Hobby>) => {
            state.loading = true;
        },
        updateUserHobbies: (state, action: PayloadAction<Hobby[]>) => {
            state.loading = false;
            state.hobbies = action.payload;
        },
        failLoadHobbies: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});


// action generators
export const { requestUser, requestAddHobby, requestDeleteHobby, updateUserHobbies, failLoadHobbies } = userHobbiesSlice.actions;

// slice reducer
export default userHobbiesSlice.reducer;

// state selector
export const selectCurrentUser = (state: RootState) => state.userHobbies;
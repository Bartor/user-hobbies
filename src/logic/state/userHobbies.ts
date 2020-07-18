import { RootState } from '../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Hobby from '../../core/types/Hobby.interface';

export interface UserHobbiesState {
    userId: string,
    hobbies: Hobby[],
    loading: boolean
}

const initialState: UserHobbiesState = {
    userId: '',
    hobbies: [],
    loading: false
};

export const userHobbiesSlice = createSlice({
    name: 'userHobbies',
    initialState,
    reducers: {
        requestUser: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
            state.loading = true;
        },
        updateUserHobbies: (state, action: PayloadAction<Hobby[]>) => {
            state.hobbies = action.payload;
        }
    }
});


// action generators
export const { requestUser, updateUserHobbies } = userHobbiesSlice.actions;

// slice reducer
export default userHobbiesSlice.reducer;

// state selector
export const selectCurrentUser = (state: RootState) => state.userHobbies;
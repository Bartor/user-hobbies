import { RootState } from '../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../core/types/User.interface';

export interface UsersState {
    users: User[],
    loading: boolean,
    error: string // can be changed to nullable error object
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: ''
}

/**
 * Common naming convention:
 * - 'requestX' actions assume that the saga takes care of the side effects
 * - other action just work on the current state
 */
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        requestAddUser: (state, action: PayloadAction<string>) => {
            state.loading = true;
            state.error = '';
        },
        requestLoadUserList: (state) => {
            state.loading = true;
            state.error = '';
        },
        updateUserList: (state, action: PayloadAction<User[]>) => {
            state.loading = false;
            state.users = action.payload;
        },
        failLoadUser: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

// action generators
export const { requestAddUser, requestLoadUserList, updateUserList, failLoadUser } = usersSlice.actions;

// slice reducer
export const selectUsers = (state: RootState) => state.users;

// state selector
export default usersSlice.reducer;
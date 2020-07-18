import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../logic/state/users';
import userHobbiesReducer from '../logic/state/userHobbies';
import createSagaMiddleWare from 'redux-saga';
import { watchAllSagas } from '../logic/sagas';

const sagaMiddleWare = createSagaMiddleWare();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    userHobbies: userHobbiesReducer
  },
  middleware: [...getDefaultMiddleware(), sagaMiddleWare]
});

sagaMiddleWare.run(watchAllSagas);


export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

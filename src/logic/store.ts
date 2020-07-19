import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import usersReducer from './state/users';
import userHobbiesReducer from './state/userHobbies';
import createSagaMiddleWare from 'redux-saga';
import { watchAllSagas } from './sagas';

const sagaMiddleWare = createSagaMiddleWare();

export const store = configureStore({
  reducer: {
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

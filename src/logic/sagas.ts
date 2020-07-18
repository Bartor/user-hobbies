import { getUserList } from './api/api';
import { call, put, takeEvery } from 'redux-saga/effects'
import { updateUserList, failLoading } from './state/users';

export function* getUserListWorker() {
    try {
        const userList = yield call(getUserList);
        yield put(updateUserList(userList));
    } catch (error) {
        yield put(failLoading('failed')); // todo make this descriptive
    }
}

export function* watchAllSagas() {
    yield takeEvery('users/requestAddUser', getUserListWorker);
}
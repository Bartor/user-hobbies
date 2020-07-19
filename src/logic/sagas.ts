import { PayloadAction } from '@reduxjs/toolkit';
import { getUserList, addUser, getUser, addHobby, deleteHobby } from './api/client';
import { call, put, takeEvery, select } from 'redux-saga/effects'
import { updateUserList, failLoadUser, requestAddUser, requestLoadUserList } from './state/users';
import { updateUserHobbies, requestUser, failLoadHobbies, selectCurrentUser, requestAddHobby, requestDeleteHobby } from './state/userHobbies';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Hobby from '../core/types/Hobby.interface';

const swal = withReactContent(Swal);
async function confirm(hobby: Hobby) {
    return await swal.fire({
        title: `Delete ${hobby.name}?`,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        heightAuto: false,
        focusConfirm: false,
        customClass: {
            confirmButton: 'swal-buttons swal-confirm',
            cancelButton: 'swal-buttons swal-cancel'
        },
        buttonsStyling: false
    });
}

export function* getUserListWorker() {
    try {
        yield put(updateUserList(yield call(getUserList)));
    } catch (error) {
        yield put(failLoadUser(error));
    }
}

export function* addUserWorker(action: PayloadAction<string>) {
    try {
        yield call(addUser, action.payload);
        yield put(requestLoadUserList());
    } catch (error) {
        yield put(failLoadUser(error));
    }
}

export function* getUserWorker(action: PayloadAction<string>) {
    try {
        const userData = yield call(getUser, action.payload);
        yield put(updateUserHobbies(userData.hobbies));
    } catch (error) {
        yield put(failLoadHobbies(error));
    }
}

export function* addHobbyWorker(action: PayloadAction<Hobby>) {
    try {
        action.payload.since = new Date(Number(action.payload.since), 0).toISOString();
        const currentUser = yield select(selectCurrentUser);
        yield call(addHobby, currentUser.userId, action.payload);
        yield put(requestUser(currentUser.userId));
    } catch (error) {
        yield put(failLoadHobbies(error));
    }
}

export function* promptDeleteHobbyWorker(action: PayloadAction<Hobby>) {
    const result = yield call(confirm, action.payload);
    if (result.isConfirmed) {
        try {
            const currentUser = yield select(selectCurrentUser);
            yield call(deleteHobby, currentUser.userId, action.payload.id);
            yield put(requestUser(currentUser.userId));
        } catch (error) {
            yield put(failLoadHobbies(error));
        }
    }
}

export function* watchAllSagas() {
    yield takeEvery(requestLoadUserList().type, getUserListWorker);
    yield takeEvery(requestAddUser('').type, addUserWorker);

    yield takeEvery(requestUser('').type, getUserWorker);
    yield takeEvery(requestAddHobby({} as Hobby).type, addHobbyWorker);
    yield takeEvery(requestDeleteHobby({} as Hobby).type, promptDeleteHobbyWorker);
}
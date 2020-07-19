import React, { useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, requestAddUser } from '../../logic/state/users';
import { requestUser, selectCurrentUser } from '../../logic/state/userHobbies';

import './UserList.scss';

export default function UserList() {
    const users = useSelector(selectUsers);
    const currentUser = useSelector(selectCurrentUser);

    const dispatch = useDispatch();
    const [username, setUsername] = useState('');

    const userElements = users.users.map(user => (
        <tr
            key={user.id}
            onClick={() => dispatch(requestUser(user.id))}
        >
            <td className={user.id === currentUser.userId ? 'active' : ''}
            >{user.name}</td>
        </tr>
    ));

    const noUsersMessage = (
        <tr>
            <td id='info' >No users registered yet</td>
        </tr>
    );

    function addNewUser(e: FormEvent) {
        e.preventDefault();
        dispatch(requestAddUser(username));
        setUsername('');
    }

    return (
        <article id='user-list'>
            <section>
                <form onSubmit={addNewUser}>
                    <input
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder='Username'
                    />
                    <button type='submit'>
                        Add a user
                    </button>
                </form>
            </section>
            <section className='scrollable'>
                <table>
                    <tbody className={users.loading || currentUser.loading ? 'loading' : ''}>
                        {userElements.length ? userElements : noUsersMessage}
                    </tbody>
                </table>
            </section>
        </article >
    );
}
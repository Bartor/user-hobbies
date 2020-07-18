import React from 'react';
import './UserList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, requestAddUser } from '../../logic/state/users';

export default function UserList() {
    const users = useSelector(selectUsers);
    const dispatch = useDispatch();

    const userElements = users.users.map(user => (
        <tr
            onClick={() => console.log(user.id)}
        >
            <td>{user.name}</td>
        </tr>
    ));

    return (
        <article>
            <section>
                <input />
                <button
                    onClick={() => dispatch(requestAddUser('test'))
                    }>
                    Add a user
                </button>
                <table>
                    <tbody>
                        {userElements}
                    </tbody>
                </table>
            </section>
        </article>
    );
}
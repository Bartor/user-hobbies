import React, { useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, requestAddHobby, requestDeleteHobby } from '../../logic/state/userHobbies';
import { PassionLevel, translatePassion } from '../../core/types/PassionLevel.enum';

import './HobbyList.scss';

export default function HobbyList() {
    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const [passion, setPassion] = useState('LOW');
    const [name, setName] = useState('');
    const [year, setYear] = useState('');

    const hobbyElements = currentUser.hobbies.map(hobby => (
        <tr key={hobby.id}>
            <td>{translatePassion(hobby.level)}</td>
            <td>{hobby.name}</td>
            <td>Since {new Date(hobby.since).getFullYear()}</td>
            <td>
                <button
                    className='detele'
                    onClick={() => dispatch(requestDeleteHobby(hobby))}
                >
                    Delete this hobby
                </button>
            </td>
        </tr>
    ));

    const noHobbiesMessage = (
        <tr>
            <td id='info'>
                This user has no hobbies
            </td>
        </tr>
    );

    function addNewHobby(e: FormEvent) {
        e.preventDefault();
        dispatch(requestAddHobby(
            {
                id: '',
                name: name,
                since: year,
                level: passion as PassionLevel
            }
        ));
        setName('');
        setYear('');
    }

    return (
        <article id='hobby-list'>
            <section>
                <form onSubmit={addNewHobby}>
                    <select
                        onChange={e => setPassion(e.currentTarget.value)}
                    >
                        {Object.keys(PassionLevel).map(passionLevel => (
                            <option value={passionLevel} key={passionLevel}>
                                {translatePassion(passionLevel)}
                            </option>
                        ))}
                    </select>
                    <input required
                        value={name}
                        placeholder='Name of the hobby'
                        onChange={e => setName(e.target.value)}
                    />
                    <input required
                        value={year}
                        max={new Date().getFullYear()}
                        min={1900}
                        placeholder='Year of the start'
                        type='number'
                        onChange={e => setYear(e.target.value)}
                    />
                    <button
                        type='submit'
                        disabled={currentUser.userId === ''}
                    >
                        Add a hobby
                    </button>
                </form>
            </section>
            <section className='scrollable'>
                <table>
                    <tbody>
                        {hobbyElements.length ? hobbyElements : noHobbiesMessage}
                    </tbody>
                </table>
            </section>
        </article>
    );
}
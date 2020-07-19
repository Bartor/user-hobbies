import React from 'react';
import { mount } from 'enzyme';

import App from '../../App';
import { Provider } from 'react-redux';
import { store } from '../../logic/store';
import HobbyList from './HobbyList';

describe('App', () => {
    const appWrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>
    );

    describe('HobbyList', () => {
        const hobbyList = appWrapper.find('#hobby-list');

        it('Has a disabled button before choosing a user', () => {
            const button = hobbyList.find('button');
            expect(button.props().disabled).toEqual(true);
        });
    });
});
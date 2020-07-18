import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

export interface NavigationProps {
    navLinks: {
        uri: string,
        title: string
    }[];
}


export default function Navigation({ navLinks }: NavigationProps) {
    const navElements = navLinks.map(navLink => (
        <Link to={navLink.uri}>
            {navLink.title}
        </Link>
    ));

    return (
        <header>
            <h1>User Hobbies</h1>
            <nav>
                {navElements}
            </nav>
        </header>
    );
}
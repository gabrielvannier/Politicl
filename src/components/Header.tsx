//import react
import React from 'react';
import logo from '../logo.svg';


function Header() {
    return (
        <div className="Header">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p className='Game-headline'>
                    Welcome to Politicl
                </p>
            </header>
        </div>

    );
}

export default Header;
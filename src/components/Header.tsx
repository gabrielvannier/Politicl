//import react
import React from 'react';
import { blue,white,red } from '../utils/constants';

function Header() {
    const logo512 = '../logo512.png';
    const headlineStyle = {
        fontSize : "50px",
        color: blue,
        fontWeight : "bold",
        //contour the text
        WebkitTextStroke: "1px black",
    }
    return (
        <div className="Header">
            <header className="App-header">
                <img src={logo512} className="App-logo" alt="logo" />
                <p className='Game-headline'>
                    <span style = {headlineStyle}>Politicl</span>
                    <span style={
                        {...headlineStyle, color: white}
                    }>.</span>
                    <span style= {{...headlineStyle, color:red}}>fr</span>
                </p>
                <p className='game-instruction'>
                    Devine la personnalité politique du jour :
                </p>
            </header>
        </div>

    );
}

export default Header;
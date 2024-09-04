import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer" style={{marginTop:'50px'}}>
            <nav style={{width:'100%',display:'flex',justifyContent:'space-evenly'}} >
                <Link to="/contribute"> Contribuer </Link>
                <Link to="/report"> Signaler une erreur </Link>
            </nav>
        </footer>
    );
}
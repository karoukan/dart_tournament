import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4">
            <nav className="container mx-auto flex justify-between">
                <h1 className="text-2xl font-bold">Tournoi de fléchettes</h1>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:underline">Accueil</Link>
                    </li>
                    <li>
                        <Link to="/add-participants" className="hover:underline">Ajouter des participants</Link>
                    </li>
                    <li>
                        <Link to="/add-match" className="hover:underline">Ajouter un match</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

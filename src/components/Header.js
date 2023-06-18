import logoHeader from "../images/Logo.svg";
import React from "react";

function Header() {
    return (
        <header className="header">
            <img src={logoHeader} className="header__logo" alt="Лого" />
        </header>
    );
}

export default Header;

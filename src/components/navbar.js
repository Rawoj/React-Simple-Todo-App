import React from "react";
import NavbarButton from "./navbar-button.js";

class Navbar extends React.Component {
    render() {
        return (
            <div className="nav-container custom-background-color custom-padding-low nav-bar" role="navigation">
                <nav>
                    <ul className="nav justify-content-center">
                        <NavbarButton to="/" name="Home" />
                        <NavbarButton to="/todo" name="Todo List" />
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar;
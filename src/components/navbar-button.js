import React from "react";
import { Link } from 'react-router-dom'
function NavbarButton(props) {
    return (
        <li className="nav-item">
            <Link to={props.to}>
                <button className="btn me-2 navbar-button" aria-current="page" >{props.name}</button>
            </Link>
        </li>
    )
}

export default NavbarButton;
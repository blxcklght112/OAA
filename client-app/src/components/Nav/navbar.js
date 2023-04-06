import React from "react";

export default function Navbar() {
    return (
            <nav className="nav">
                <p className="site-title">
                    Group 9
                </p>
                <ul>
                    <li>
                        <a href="/" className="user-info">
                            <p className="nav-username">
                                {localStorage.getItem("username")}
                            </p>
                            <p className="nav-role">
                                {localStorage.getItem("role")}
                            </p>
                        </a>
                    </li>
                </ul>
            </nav>
    )
}
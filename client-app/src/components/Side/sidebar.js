import React from "react";
import logo from "../../assets/imgs/logo_utc.png";
import { Link, useMatch, useResolvedPath } from "react-router-dom";


export default function SideBar() {
    const CustomLink = ({ to, children, ...props }) => {
        const resolvedPath = useResolvedPath(to);
        const isActive = useMatch({ path: resolvedPath.pathname, end: true });
        return (
            <li className={isActive ? "active" : ""}>
                <Link to={to} {...props}>
                    {children}
                </Link>
            </li>
        )
    }
    return (
        <div className="side">
            <Link className="logo" to="/home">
                <img src={logo} alt="logo" />
            </Link>
            <div className="title">
                Online Asset <br /> Assignment
            </div>
            <div className="side-bar">
                <ul>
                    <CustomLink to="/home">
                        Home
                    </CustomLink>
                    <CustomLink to="/user">
                        User
                    </CustomLink>
                    <CustomLink to="/asset">
                        Asset
                    </CustomLink>
                    <CustomLink to="/assignment">
                        Assignment
                    </CustomLink>
                </ul>
            </div>
        </div>
    )
}


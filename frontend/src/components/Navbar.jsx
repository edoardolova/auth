import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {

    const { token, logoutUser } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg glass-navbar">

            <div className="container-fluid ">

                <Link className="navbar-brand text-white" to="/">MyLogin</Link>


                    <ul className="navbar-nav me-auto ms-auto">

                        {token && (
                            <li className="nav-item fs-4">
                                <Link className="nav-link text-white" to="/profile">
                                    PROFILO
                                </Link>
                            </li>
                        )}

                    </ul>

                    {token && (
                        <button
                            className="btn btn-outline-light"
                            onClick={logoutUser}
                        >
                            Logout
                        </button>
                    )}


            </div>

        </nav>
    );
}


import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {

    const { getUserProfile, token } = useContext(AuthContext);

    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
    }, [token, navigate]);


    useEffect(() => {

        async function loadProfile() {

            const data = await getUserProfile();

            if (!data) {
                navigate("/");
                return;
            }

            setUserData(data);
        }

        loadProfile();

    }, []);


    if (!userData) {
        return <div>Caricamento...</div>;
    }


    return (
        <>
            <div className="container">
                <h1 className="text-white py-4">Il tuo profilo</h1>
            </div>

            <div className="container d-flex justify-content-center mt-5">
                <div className="card p-5 shadow bg-transparent text-white">
                    <h3>
                        {userData.name} {userData.surname}
                    </h3>
                    <p>@{userData.username}</p>
                    <p>Email - {userData.email}</p>
                    {userData.birth_year && (
                        <p>
                            Nascita - {new Date(userData.birth_year).toLocaleDateString("it-IT")}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

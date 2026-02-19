import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {notifySuccess, notifyError} from "../utils/notify.js"

export default function LoginPage(){
    const { loginUser, signUpUser, token } = useContext(AuthContext);

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const [signUpData, setSignUpData] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        surname: "",
        birth_year: ""
    })

    const [isLogin, setIsLogin] = useState(true);
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);

    function handleLoginChange(e){
        const { name, value } = e.target;

        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    function handleSignUpChange(e){
        const { name, value } = e.target;

        setSignUpData({
            ...signUpData,
            [name]: value
        });
    }

    async function handleLogin(e){

        e.preventDefault();

        if (token) {
            notifyError("Sei già loggato")
            return
            
        }

        const success = await loginUser(
            loginData.username,
            loginData.password
        );

        if(success){
            notifySuccess("Loggato")
            setLoginData({
                username: "",
                password: ""
            })
        } 
        else {
            notifyError("Credenziali non valide")
        }
    }

    async function handleSignUp(e){
        e.preventDefault()
        console.log(signUpData)
        
        const res = await signUpUser(signUpData);
        if (!res.error) {
            notifySuccess("Registrato con successo")
            setSignUpData({
                username: "",
                email: "",
                password: "",
                name: "",
                surname: "",
                birth_year: ""
            })
        }
        else {
            console.log(res.mess)
            notifyError(res.mess)
        }
    }


    

    return(
        <div className="container d-flex flex-column py-5">
            <div className="d-flex mb-5">
                <h1 className="text-white">{ isLogin ? "Bentornato" : "Benvenuto"}</h1>

                <div className="ms-auto my-auto">
                    <button className="btn btn-outline-light" onClick={()=>setIsLogin(!isLogin)}>
                        { isLogin ? "Registrati" : "Login"}
                    </button>
                </div>

            </div>

            {isLogin ? (
                <form onSubmit={handleLogin} className="shadow p-4 rounded text-white">

                    <div className="mb-3">
                        <label className="form-label">Username</label>

                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={loginData.username}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>

                    <div className="d-flex">
                        <button type="submit" className="btn btn-outline-light mx-auto w-md-25 fs-4">
                            Login
                        </button>
                    </div>

                </form>

            ): (
                <form onSubmit={handleSignUp} className="shadow p-4 rounded text-white">

                        <div className="mb-3">
                            <label className="form-label">Nome *</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={signUpData.name}
                                onChange={handleSignUpChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Cognome *</label>
                            <input
                                type="text"
                                className="form-control"
                                name="surname"
                                value={signUpData.surname}
                                onChange={handleSignUpChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username *</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                value={signUpData.username}
                                onChange={handleSignUpChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email *</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={signUpData.email}
                                onChange={handleSignUpChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password *</label>

                            <div className="input-group">

                                <input
                                    type={showSignUpPassword ? "text" : "password"}
                                    className="form-control"
                                    name="password"
                                    value={signUpData.password}
                                    onChange={handleSignUpChange}
                                    required
                                />

                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => setShowSignUpPassword(prev => !prev)}
                                >
                                    {showSignUpPassword ? "👁" : "🙈"}
                                </button>

                            </div>

                        </div>

                        <div className="mb-3">
                            <label className="form-label">Anno di nascita</label>
                            <input
                                type="date"
                                className="form-control"
                                name="birth_year"
                                value={signUpData.birth_year}
                                onChange={handleSignUpChange}
                            />
                        </div>


                    <div className="d-flex">
                        <button type="submit" className="btn btn-outline-light mx-auto w-md-25 fs-4">
                            Registrati
                        </button>
                    </div>

                </form>
            )}
        </div>
    )
}

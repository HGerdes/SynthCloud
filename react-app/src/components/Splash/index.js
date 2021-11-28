import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { login } from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import "./splash.css"


const Splash = () => {
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const demo = () => {
        setEmail('demo@aa.io')
        setPassword('password')
        dispatch(login('demo@aa.io', 'password'))
    }

    if (user) {
        return <Redirect to="/home" />;
    }

    return (
        <>
            <div className="splashPageContainer">
                <div className="splashDescContainer">
                    <div className="splashDesc">
                        Welcome to SynthCloud!  SynthCloud allows users to browse and upload their own synthwave tracks.
                    </div>

                    <div className="enterSiteContainer">
                        <div className="splashSignUp">
                            <NavLink to="/signup" className="splashSignUpLink splashBtn">Sign Up</NavLink>
                        </div>
                        <div className="splashLogin" >
                                <LoginFormModal />
                        </div>
                        <div className="splashDemoBtn">
                            <button onClick={demo} className="splashDemoBtn splashBtn">Demo User</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Splash;

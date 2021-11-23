import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logout } from "../../store/session";
import "./accountNav.css"

const AccountNav = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutUser = async () => {
        await dispatch(logout());
        history.push("/");
    };

    return (
        <>
            <div className="navDropdownContainer">
                <div className="logoutBtn" onClick={() =>{
                                            document.querySelector(".account-dropdown").classList.add("hidden");
                                            logoutUser();
                                            }}>
                    Log Out
                </div>
            </div>
        </>
    )
}

export default AccountNav;

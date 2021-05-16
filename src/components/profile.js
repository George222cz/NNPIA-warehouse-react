import React, {useEffect} from "react";
import {useState} from "react";
import {Redirect} from "react-router-dom";

import AuthService from "../services/auth";

export default function Profile(props) {

    const [redirect, setRedirect] = useState()
    const [currentUser, setCurrentUser] = useState()

    useEffect(()=>{
        const user = AuthService.getCurrentUser();
        if(!user) setRedirect("/home");
        setCurrentUser(user);
    },[]);

    return (
        <div>
            {redirect && <Redirect to={redirect} />}
            {currentUser && <div>
                <h2>Welcome {currentUser.username}</h2>
                <p>Email: {currentUser.email}</p>
                <p>Role: {currentUser.roles[0]}</p>
            </div>}

        </div>
    );
}
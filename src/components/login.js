import React from "react";
import {useState} from "react";

import AuthService from "../services/auth";

function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [feedback, setFeedback] = useState()

    const onSubmitHandler = event => {
        event.preventDefault();
        setLoading(true);
        setFeedback();

        const loginRequest = {
            username: username,
            password: password
        }

        fetch("http://localhost:8080/auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginRequest)
        }).then(response => {
            if(response.ok){
                return response.json();
            }
            throw new Error("Špatně zadané údaje");
        }).then(json => {
            if (json.accessToken) {
                AuthService.login(json);
            }
            return json;
        }).then(() => {
                props.history.push("/profile");
                window.location.reload();
        }).catch((error)=>{
            setFeedback(error.message);
            setLoading(false);
        });

    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <input type={"text"} placeholder={"Username"} required={true} value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type={"password"} placeholder={"Password"} required={true} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type={"submit"} value={"Sign in"}/>
            </form>
            {loading && "Loading..."}
            {feedback && <div>{feedback}</div>}
        </div>
    );

}

export default Login;
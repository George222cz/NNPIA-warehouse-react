import React from "react";
import {useState} from "react";

import AuthService from "../services/auth";
import UserService from "../services/user";

export default function Login(props) {
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

        UserService.postDataAPI('auth/signin',loginRequest,"",true).then(json => {
            if (json.accessToken) {
                AuthService.login(json);
            }
            return json;
        }).then(() => {
                props.history.push("/profile");
                window.location.reload();
        }).catch((error)=>{
            setFeedback(JSON.parse(error.message).message);
            setLoading(false);
        });

    }

    return (
        <div>
            <h2>Sign in</h2>
            <div className={"container"} style={{width: "25%", paddingTop: "20px"}}>
                <form onSubmit={onSubmitHandler}>
                    <input type={"text"} placeholder={"Username"} required={true} value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type={"password"} placeholder={"Password"} required={true} value={password} onChange={(e) => setPassword(e.target.value)} style={{marginTop: "6px"}}/>
                    <input type={"submit"} value={"Sign in"} className={"submitButton"}/>
                </form>
                <div>
                {loading && "Loading..."}
                {feedback && <div>{feedback}</div>}
                </div>
            </div>
        </div>
    );

}
import React, {useEffect} from "react";
import {useState} from "react";
import UserService from "../services/user";
import {Link} from "react-router-dom";

export default function Transfers(props) {

    const [content, setContent] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        setLoading(true);
        // transfers

    },[]);

    return (
        <div className={"container"}>
            <h2>Transfers</h2>
            {loading && "Loading..."}
            {error && <div>{error}</div>}
            {content && <div><table style={{width:"100%"}}>
                <thead><tr><td>Id</td><td>Address</td><td>Created</td><td>State</td><td>Edit state</td></tr></thead><tbody>
            {content.map((transfer,index)=><tr key={index} className={"row"}>
                <td>{transfer.id}</td>
                <td>{transfer.address}</td>
                <td>{transfer.created}</td>
                <td>{transfer.state}</td>
                <td><div className={"mirror"}><Link to={"/product/"+product.id} style={{textDecorationLine: "none"}}>✎</Link></div></td>
            </tr>)}
            </tbody></table></div>}
        </div>
    );
}
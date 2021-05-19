import React, {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import UserService from "../services/user";

export default function Warehouses(props) {

    const [content, setContent] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        UserService.getDataAPI('warehouse').then(json=>{
            setContent(json);
            console.log(json);
            setLoading(false);
        }).catch((err)=>{
            setError(err.message);
            setLoading(false);
        });
    },[]);

    return (
        <div>
            <h2>Warehouses</h2>
            <div className={"container"}>
                {loading && "Loading..."}
                {error && <div>{error}</div>}
                {content && (content.length===0 ? <div>Empty</div> : <div style={{marginBottom: "10px"}}><table style={{width:"100%"}}>
                    <thead><tr><td>Id</td><td>Name</td><td>Address</td><td>Show products</td><td>Add product</td></tr></thead><tbody>
                    {content.map((item,index)=><tr key={index} className={"row"}>
                        <td>{item.id}</td>
                        <td>{item.warehouseName}</td>
                        <td>{item.address}</td>
                        <td><div><Link to={{pathname:"/products/"+item.id, state: {warehouseName: item.warehouseName} }} style={{textDecorationLine: "none"}}>Show</Link></div></td>
                        <td><div><Link to={"/product-form/"+item.id} style={{textDecorationLine: "none"}}>New</Link></div></td>
                    </tr>)}
                </tbody></table></div>)}
            </div>
        </div>
    );
}
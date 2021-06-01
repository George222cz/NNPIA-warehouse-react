import React, {useEffect} from "react";
import {useState} from "react";
import {Link} from "react-router-dom";
import UserService from "../services/user";

export default function Warehouses() {

    const [content, setContent] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [warehouseName, setWarehouseName] = useState("");
    const [address, setAddress] = useState("");

    useEffect(()=>{
        setLoading(true);
        UserService.getDataAPI('warehouse').then(json=>{
            setContent(json);
            setLoading(false);
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    },[]);

    const onSubmitHandler = event => {
        event.preventDefault();
        setLoading(true);

        let body = {warehouseName: warehouseName,address: address}

        UserService.postDataAPI('warehouse',body,"",true,false).then(json=>{
            setLoading(false);
            setContent(json);
            setWarehouseName("");
            setAddress("");
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    }

    return (
        <div>
            <h2>Warehouses</h2>
            {loading ? "Loading...": <br/>}
            <div className={"container"}>
                {error ? <h3 style={{color: "red"}}>{error}</h3>:<>
                    {content && (content.length===0 ? <div>Empty</div> :
                    <div style={{marginBottom: "10px"}}><table style={{width:"100%"}}>
                        <thead><tr><td>Id</td><td>Name</td><td>Address</td><td>Show products</td><td>Add product</td></tr></thead><tbody>
                            {content.map((item,index)=>
                            <tr key={index} className={"row"}>
                                <td>{item.id}</td>
                                <td>{item.warehouseName}</td>
                                <td>{item.address}</td>
                                <td><div><Link to={{pathname:"/products/"+item.id, state: {warehouseName: item.warehouseName} }} style={{textDecorationLine: "none"}}>Show</Link></div></td>
                                <td><div><Link to={"/product-form/"+item.id} style={{textDecorationLine: "none"}}>New</Link></div></td>
                            </tr>)}
                        </tbody></table>
                    </div>)}
                </>}
                {UserService.getUser().roles.includes("ROLE_ADMIN") && <div><br/>
                    <div className={"transfer-products"} style={{backgroundColor: "gray", padding: "10px"}}>
                        <h4>Create new warehouse (ADMIN role only!)</h4>
                        <form onSubmit={onSubmitHandler}>
                            <div className="row">
                                <div className="col-15"><label htmlFor={"name"}>Name: </label></div>
                                <div className="col-85"><input type={"text"} placeholder={"Name"} id={"name"} required={true} value={warehouseName} onChange={(e) => setWarehouseName(e.target.value)}/></div>
                            </div>
                            <div className="row">
                                <div className="col-15"><label htmlFor={"address"}>Address: </label></div>
                                <div className="col-85"><input type={"text"} placeholder={"Address"} id={"address"} required={true} value={address} onChange={(e) => setAddress(e.target.value)}/></div>
                            </div>
                            <div className="row"><input type={"submit"} className={"submitButton"} value={"Create new warehouse"}/></div>
                        </form>
                    </div>
                </div>}
            </div>
        </div>
    );
}
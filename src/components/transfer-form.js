import React, {useEffect} from "react";
import {useState} from "react";

import UserService from "../services/user";

export default function TransferForm(props) {

    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [content, setContent] = useState(undefined);

    useEffect(()=>{
        setLoading(true);
        UserService.getDataAPI('transfer/form').then(json => {
            setContent(json);
            setLoading(false);
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    },[]);

    const onSubmitHandler = event => {
        event.preventDefault();
        if(window.confirm("Are you sure?")){
            setLoading(true);
            UserService.postDataAPI('transfer',undefined,'confirm/'+UserService.getUser().id+'/'+address,false).then(response=>{
                setLoading(false);
                props.history.push("/products");
                window.location.reload();
            }).catch((error)=>{
                setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
                setLoading(false);
            });
        }
    }

    const handleAddProductTransfer = id => {
        setLoading(true);
        UserService.postDataAPI('transfer/form',undefined,id,true,false).then(json=>{
            setLoading(false);
            setContent(json);
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    }

    const handleRemoveProductTransfer = id => {
        setLoading(true);
        UserService.deleteDataAPI('transfer/form',undefined,id,true,false).then(json=>{
            setLoading(false);
            setContent(json);
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    }

    return (
        <div>
            <h2>Transfer form</h2>
            {loading && "Loading..."}
            {error ? <h3 style={{color: "red"}}>{error}</h3>:
            <div className="container">
                {content && (content.length===0 ? <div>Empty</div> :
                <div>
                    <div>Products:
                        <table style={{width:"80%"}} className={"transfer-products"}>
                            <thead><tr><td>Name</td><td>Amount</td><td>Add</td><td>Remove</td></tr></thead><tbody>
                                {content.map((item,index)=>
                                <tr key={index} >
                                    <td>{item.key.productName}</td>
                                    <td>{item.value}</td>
                                    <td><button onClick={()=>handleAddProductTransfer(item.key.id)}>+</button></td>
                                    <td><button onClick={()=>handleRemoveProductTransfer(item.key.id)}>-</button></td>
                                </tr>)}
                        </tbody></table>
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <div className="row">
                            <div className="col-15"><label htmlFor={"address"}>Address: </label></div>
                            <div className="col-85"><input type={"text"} placeholder={"Address"} id={"address"} required={true} value={address} onChange={(e) => setAddress(e.target.value)}/></div>
                        </div>
                        <div className="row"><input type={"submit"} className={"submitButton"} value={"Create new transfer"}/></div>
                    </form>
                </div>)}
            </div>}
        </div>
    );
}
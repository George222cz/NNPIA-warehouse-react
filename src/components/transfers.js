import React, {useEffect} from "react";
import {useState} from "react";
import UserService from "../services/user";

export default function Transfers() {

    const [content, setContent] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        loadData();
    },[]);

    function changeStateHandler(id, value) {
        if(window.confirm("Are you sure? This cannot be undone!")) {
            UserService.putDataAPI('transfer', undefined, "change-state/" + id + "/" + value, false,false).then(json => {
                setLoading(false);
                window.location.reload();
            }).catch((error) => {
                setError(error.message);
                setLoading(false);
            });
        }
    }

    function loadData(filter = undefined) {
        let optionalURL = "";
        if(filter){
            optionalURL = filter;
        }
        setLoading(true);
        UserService.getDataAPI('transfer', optionalURL).then(json=>{
            setContent(undefined);
            setContent(json);
            setLoading(false);
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    }

    return (
        <div>
            <h2>Transfers</h2>
            {loading ? "Loading...": <br/>}
            <div className={"container"}>
                {error && <h3 style={{color: "red"}}>{error}</h3>}
                <div style={{float:"right",marginRight: "1%"}}>
                    <select onChange={(e)=>loadData(e.target.value)} style={{padding: "6px"}}>
                        <option selected value={""}> </option>
                        <option value="PENDING">PENDING</option>
                        <option value="DONE">DONE</option>
                        <option value="CANCELED">CANCELED</option>
                    </select></div><b style={{float:"right", padding: "4px"}}>Filter status: </b>
                    {content && (content.length===0 ? <div>Empty</div> :<div>
                        <table style={{width:"100%"}}>
                        <thead><tr><td>Id</td><td>Address</td><td>Created</td><td>Crated by</td><td>Change status</td></tr></thead><tbody>
                            {content.map((transfer,transferIndex)=>
                            <React.Fragment key={transferIndex}>
                                <tr className={"row"}>
                                    <td>{transfer.id}</td>
                                    <td>{transfer.address}</td>
                                    <td>{transfer.created}</td>
                                    <td>{transfer.user.username}</td>
                                    <td>
                                        <select defaultValue={transfer.state} onChange={(e)=>changeStateHandler(transfer.id,e.target.value)} disabled={transfer.state==='DONE' || transfer.state==='CANCELED'}>
                                            <option value="PENDING">PENDING</option>
                                            <option value="DONE">DONE</option>
                                            <option value="CANCELED">CANCELED</option>
                                        </select>
                                    </td>
                                </tr><tr>
                                    <td colSpan={5}>
                                        <div className={"transfer-products"} style={{backgroundColor: "gray", display: "flex"}}>
                                            <div className={"transfer-details"} style={{fontWeight:"bold"}}><div>Name: </div><div>Amount: </div><div>Warehouse Id: </div></div>
                                            {transfer.transferItems.map((transferItem,index)=>
                                            <div key={index} className={"transfer-details"}>
                                                <div>{transferItem.product.productName}</div>
                                                <div>{transferItem.amount}</div>
                                                <div>{transferItem.product.warehouseId}</div>
                                            </div>)}
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>)}
                        </tbody>
                    </table></div>)}
            </div>
        </div>
    );
}
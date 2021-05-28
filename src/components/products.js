import React, {useEffect} from "react";
import {useState} from "react";
import UserService from "../services/user";
import {Link} from "react-router-dom";

export default function Products(props) {

    const [content, setContent] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [warehouseId, setWarehouseId] = useState(undefined)
    const [warehouseContent, setWarehouseContent] = useState(undefined)

    useEffect(()=>{
        setLoading(true);
        let optionalURL = "";

        if(props.match.params.warehouseId){
            optionalURL = "warehouse/"+props.match.params.warehouseId;
            setWarehouseId(props.match.params.warehouseId);
        }else{
            UserService.getDataAPI('warehouse').then(json=>{
                setWarehouseContent(json);
                if(json && Object.keys(json).length>0) setWarehouseId(json[0].id);
                setLoading(false);
            }).catch((error)=>{
                setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
                setLoading(false);
            });
        }

        UserService.getDataAPI('product',optionalURL).then(json=>{
            setContent(json);
            setLoading(false);
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    },[]);

    const handleRemoveProduct = id => {
        if(window.confirm("Do you really want remove this product?")){
            setLoading(true);
            UserService.deleteDataAPI('product',undefined,id).then(json=>{
                setLoading(false);
                setContent(json);
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
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    }

    const handleRemoveProductTransfer = id => {
        setLoading(true);
        UserService.deleteDataAPI('transfer/form',undefined,id,true,false).then(json=>{
            setLoading(false);
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    }

    return (
        <div>
            <h2>Products{props.location.state && " of \""+props.location.state.warehouseName+"\""}</h2>
            {loading && "Loading..."}
            {error && <h3 style={{color: "red"}}>{error}</h3>}
            <div className={"container"}>
                <div style={{marginBottom: "10px"}}>{props.match.params.warehouseId && "This warehouse has id: "+warehouseId}</div>
                {content && (content.length===0 ? <div>Empty</div> : <div style={{marginBottom: "10px"}}><table style={{width:"100%"}}>
                    <thead><tr><td>Id</td><td>Name</td><td>Amount</td><td>Weight per unit</td><td>Description</td><td>Warehouse Id</td><td>Edit</td><td>Remove</td>
                        <td colSpan={"2"} style={{width: "8%"}}>New transfer</td></tr></thead>
                    <tbody>{content.map((product,index)=>
                        <tr key={index} className={"row"}>
                            <td>{product.id}</td>
                            <td>{product.productName}</td>
                            <td>{product.amount}</td>
                            <td>{product.unitWeight}</td>
                            <td>{product.description}</td>
                            <td>{product.warehouseId}</td>
                            <td><div className={"mirror"}><Link to={"/product/"+product.id} style={{textDecorationLine: "none",padding: "0px"}}>✎</Link></div></td>
                            <td><div><button onClick={()=>handleRemoveProduct(product.id)}>X</button></div></td>
                            <td><div><button onClick={()=>handleAddProductTransfer(product.id)}>+</button></div></td>
                            <td><div><button onClick={()=>handleRemoveProductTransfer(product.id)}>-</button></div></td>
                        </tr>)}
                    </tbody>
                </table></div>)}
                <div className={"row"}><h3 style={{marginBottom: "0px"}}>Add Product</h3></div>
                <div className={"row"}>
                    <div className={"col-15"} style={{width: "11%"}}><label htmlFor={"warehouseId"} style={{paddingRight: "0px"}}>To warehouse:</label></div>
                    {props.match.params.warehouseId ? <div className={"col-15"} style={{padding: "12px",width: "1%"}}>{warehouseId}</div>:<div className={"col-15"}>
                        <select onChange={(e)=>setWarehouseId(e.target.value)}>
                            {warehouseContent && warehouseContent.map((warehouse,index)=><option key={index} value={warehouse.id}>{warehouse.warehouseName}</option>)}
                        </select>
                    </div>}
                    <div className={"col-15"} style={{marginLeft: "5px"}}><div className={"submitButton"} style={{float: "left"}}>
                        <Link to={warehouseId ? "/product-form/"+warehouseId : '#'} style={{textDecorationLine: "none", color: "white"}}>Add product</Link>
                    </div></div>
                </div>
            </div>
        </div>
    );
}
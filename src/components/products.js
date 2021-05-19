import React, {useEffect} from "react";
import {useState} from "react";
import UserService from "../services/user";
import {Link} from "react-router-dom";

export default function Products(props) {

    const [content, setContent] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [warehouseId, setWarehouseId] = useState()

    useEffect(()=>{
        setLoading(true);
        let optionalURL = "";
        if(props.match.params.warehouseId){
            optionalURL = "warehouse/"+props.match.params.warehouseId;
            setWarehouseId(props.match.params.warehouseId);
        }
        UserService.getDataAPI('product',optionalURL).then(json=>{
            setContent(json);
            setLoading(false);
        }).catch((err)=>{
            setError(err.message);
            setLoading(false);
        });
    },[]);

    const handleRemoveProduct = id => {
        if(window.confirm("Do you really want remove this product?")){
            setLoading(true);
            UserService.deleteDataAPI('product',undefined,id).then(json=>{
                setLoading(false);
                setContent(json);
            }).catch((err)=>{
                setError(err.message);
                setLoading(false);
            });
        }

    }

    const handleAddProductTransfer = id => {
        setLoading(true);
        UserService.postDataAPI('transfer/form',undefined,id).then(json=>{
            setLoading(false);
        }).catch((err)=>{
            setError(err.message);
            setLoading(false);
        });
    }

    const handleRemoveProductTransfer = id => {
        setLoading(true);
        UserService.deleteDataAPI('transfer/form',undefined,id).then(json=>{
            setLoading(false);
        }).catch((err)=>{
            setError(err.message);
            setLoading(false);
        });
    }

    return (
        <div>
            <h2>Products{props.location.state && " of "+props.location.state.warehouseName}</h2>
            <div className={"container"}>
            <div>{warehouseId && "Warehouse id: "+warehouseId}</div>
            {loading && "Loading..."}
            {error && <div>{error}</div>}
            {content && (content.length===0 ? <div>Empty</div> : <div style={{marginBottom: "10px"}}><table style={{width:"100%"}}>
                <thead><tr><td>Id</td><td>Name</td><td>Amount</td><td>Weight per unit</td><td>Description</td><td>Edit</td><td>Remove</td><td colSpan={"2"} style={{width: "8%"}}>New transfer</td></tr></thead><tbody>
                {content.map((product,index)=><tr key={index} className={"row"}>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>{product.amount}</td>
                    <td>{product.unitWeight}</td>
                    <td>{product.description}</td>
                    <td><div className={"mirror"}><Link to={"/product/"+product.id} style={{textDecorationLine: "none"}}>✎</Link></div></td>
                    <td><div><a href={"#"} style={{textDecorationLine: "none"}} onClick={()=>handleRemoveProduct(product.id)}>X</a></div></td>
                    <td><div><a href={"#"} style={{textDecorationLine: "none"}} onClick={()=>handleAddProductTransfer(product.id)}>+</a></div></td>
                    <td><div><a href={"#"} style={{textDecorationLine: "none"}} onClick={()=>handleRemoveProductTransfer(product.id)}>-</a></div></td>
            </tr>)}
                </tbody></table></div>)}
                <div className={"row"}><h3 style={{marginBottom: "0px"}}>Add Product</h3></div>
                <div className={"row"}>
                <div className={"col-15"} style={{width: "11%"}}><label htmlFor={"warehouseId"} style={{paddingRight: "0px"}}>Warehouse ID:</label></div>
                <div className={"col-15"} style={{width: "5%"}}><input type={"text"} style={{margin: "2px"}} id={"warehouseId"} value={warehouseId} onChange={(e) => setWarehouseId(e.target.value)} disabled={props.match.params.warehouseId && "disabled"} /></div>
                <div className={"col-15"} style={{marginLeft: "5px"}}><div className={"submitButton"} style={{float: "left"}}><Link to={warehouseId ? "/product-form/"+warehouseId : '#'} style={{textDecorationLine: "none", color: "white"}}>Add product</Link></div></div>
                </div>
            </div>
        </div>
    );
}
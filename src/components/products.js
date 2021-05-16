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
        if(props.match.params.warehouseId) optionalURL = "warehouse/"+props.match.params.warehouseId;
        UserService.getProductAPI(optionalURL).then(json=>{
            setContent(json);
            setLoading(false);
        }).catch((err)=>{
            setError(err.message);
            setLoading(false);
        });
    },[]);

    return (
        <div>
            <h2>Products</h2>
            <div className={"container"}>
            <div>{props.match.params.warehouseId}</div>
            {loading && "Loading..."}
            {error && <div>{error}</div>}
            {content && <div style={{marginBottom: "10px"}}><table style={{width:"100%"}}>
                <thead><tr><td>Id</td><td>Name</td><td>Amount</td><td>Weight per unit</td><td>Description</td><td>Edit</td></tr></thead><tbody>
                {content.map((product,index)=><tr key={index} className={"row"}>
                    <td>{product.id}</td>
                    <td>{product.productName}</td>
                    <td>{product.amount}</td>
                    <td>{product.unitWeight}</td>
                    <td>{product.description}</td>
                    <td><div className={"mirror"}><Link to={"/product/"+product.id} style={{textDecorationLine: "none"}}>✎</Link></div></td>
            </tr>)}
                </tbody></table></div>}
                <div className={"row"}><h3 style={{marginBottom: "0px"}}>Add Product</h3></div>
                <div className={"row"}>
                <div className={"col-15"} style={{width: "11%"}}><label htmlFor={"warehouseId"} style={{paddingRight: "0px"}}>Warehouse ID:</label></div>
                <div className={"col-15"} style={{width: "5%"}}><input type={"text"} style={{margin: "2px"}} id={"warehouseId"} value={warehouseId} onChange={(e) => setWarehouseId(e.target.value)} /></div>
                <div className={"col-15"} style={{marginLeft: "5px"}}><div className={"submitButton"} style={{float: "left"}}><Link to={warehouseId ? "/product-form/"+warehouseId : '#'} style={{textDecorationLine: "none", color: "white"}}>Add product</Link></div></div>
                </div>
            </div>
        </div>
    );
}
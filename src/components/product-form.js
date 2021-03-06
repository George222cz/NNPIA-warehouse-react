import React, {useEffect} from "react";
import {useState} from "react";

import UserService from "../services/user";

export default function ProductForm(props) {

    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [amount, setAmount] = useState(0);
    const [unitWeight, setUnitWeight] = useState(0);
    const [description, setDescription] = useState("");
    const [warehouseId, setWarehouseId] = useState(0);

    useEffect(()=>{
        if(props.match.params.productId) {
            setLoading(true);
            UserService.getDataAPI('product',props.match.params.productId,true,false).then(json => {
                setProductId(json.id);
                setProductName(json.productName);
                setAmount(json.amount);
                setUnitWeight(json.unitWeight);
                setDescription(json.description);
                setWarehouseId(json.warehouseId);
                setLoading(false);
            }).catch((error)=>{
                setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
                setLoading(false);
            });
        }
        if (props.match.params.warehouseId){
            setWarehouseId(props.match.params.warehouseId);
        }
    },[]);

    const onSubmitHandler = event => {
        event.preventDefault();
        setLoading(true);

        let body = {productName: productName,amount: amount,unitWeight: unitWeight,description: description,warehouseId: warehouseId}
        if(productId){
            body = {id: productId,productName: productName,amount: amount,unitWeight: unitWeight,description: description,warehouseId: warehouseId}
        }

        UserService.putDataAPI('product',body,"",false,false).then(response=>{
            setLoading(false);
            window.history.back();
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    }

    return (
        <div>
            <h2>Product form</h2>
            {loading ? "Loading...": <br/>}
            {error ? <h3 style={{color: "red"}}>{error}</h3>:
            <div className="container">
                <form onSubmit={onSubmitHandler}>
                    {productId &&
                    <div className="row">
                    <div className="col-15"><label htmlFor={"productId"}>Id: </label></div>
                    <div className="col-85"><p id={"productId"}>{productId}</p></div>
                    </div>}
                    <div className="row">
                    <div className="col-15"><label htmlFor={"name"}>Name: </label></div>
                    <div className="col-85"><input type={"text"} placeholder={"Name"} id={"name"} required={true} value={productName} onChange={(e) => setProductName(e.target.value)}/></div>
                    </div>
                    <div className="row">
                    <div className="col-15"><label htmlFor={"amount"}>Amount: </label></div>
                    <div className="col-85"><input type={"number"} min={0} placeholder={"Amount"} id={"amount"} required={true} value={amount} onChange={(e) => setAmount(e.target.value)}/></div>
                    </div>
                    <div className="row">
                    <div className="col-15"><label htmlFor={"weight"}>Unit weight: </label></div>
                    <div className="col-85"><input type={"number"} min={1} placeholder={"Unit weight"} id={"weight"} required={true} value={unitWeight} onChange={(e) => setUnitWeight(e.target.value)}/></div>
                    </div>
                    <div className="row">
                    <div className="col-15"><label htmlFor={"description"}>Description: </label></div>
                    <div className="col-85"><input type={"text"} placeholder={"Description"} id={"description"} required={true} value={description} onChange={(e) => setDescription(e.target.value)}/></div>
                    </div>
                    <div className="row">
                    <div className="col-15"><label htmlFor={"warehouse"}>Warehouse Id: </label></div>
                    <div className="col-85"><p id={"warehouse"}>{warehouseId}</p></div>
                    </div>
                    <div className="row"><input type={"submit"} className={"submitButton"} value={productId ? "Edit":"Add"}/></div>
                </form>
            </div>}
        </div>
    );
}
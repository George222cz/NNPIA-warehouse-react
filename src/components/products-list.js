import React, {useEffect} from "react";
import {useState} from "react";
import List from "./list";
import authHeader from "../services/auth-header";

export default function ProductsList() {
    const [content, setContent] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [totalPages, setTotalPages] = useState(undefined)
    const head = ["id","Name","Description","Amount","Weight","Warehouse Id"];

    useEffect(()=>{
        loadContent();
    },[]);

    function loadContent(page= 0) {
        setLoading(true);
        fetch(process.env.REACT_APP_API_URL+"product/pages?"+new URLSearchParams({
            page: page,
            size: 5,
        }), {
            method: 'GET',
            headers: authHeader()
        }).then(async response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(JSON.stringify(await response.json()));
            }
        ).then(json=>{
            setContent(json.content);
            setTotalPages(json.totalPages);
            setLoading(false);
        }).catch((error)=>{
            setError(error.message.length<50 ? error.message:JSON.parse(error.message).message);
            setLoading(false);
        });
    }

    return (
        <div>
            <h2>Products list</h2>
            {loading ? "Loading...": <br/>}
            {error && <h3 style={{color: "red"}}>{error}</h3>}
            <div className={"container"}>
                {content && (content.length===0 ? <div>Empty</div> : <div style={{marginBottom: "10px"}}>
                    <List head={head} content={content} totalPages={totalPages} refreshItemsRequest={(page)=>loadContent(page)}/>
                </div>)}
            </div>
        </div>
    )
}
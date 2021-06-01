import React, {useState} from "react";

export default function List({head,content,totalPages,refreshItemsRequest}) {
    const [actualPage, setActualPage] = useState(1)

    const pageChangeHandler = (page) => {
        if(page>0 && page<=totalPages){
            setActualPage(page);
            refreshItemsRequest(page-1);
        }
    }

    return(
        <> {content && (content.length!==0 &&
            <div>
                <table style={{minWidth: "70%"}}>
                    <thead><tr>
                        {head.map((headTh,index)=>
                            <td key={index}>{headTh}</td>
                        )}
                    </tr></thead>
                    <tbody>
                    {content.map((item,index)=>
                        <tr key={index}>
                            {Object.entries(item).map(([key,value])=>
                                <td key={key}>{value}</td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
                <div style={{display: "flex", alignItems: "center"}}>
                    <b style={{paddingRight: "6px"}}>Pages: </b>
                    <button onClick={()=>pageChangeHandler(actualPage-1)}> - </button>
                    <p style={{padding: "4px"}}>{actualPage} / {totalPages}</p>
                    <button onClick={()=>pageChangeHandler(actualPage+1)}> + </button>
                </div>
            </div>
        )}</>
    )
}
import React, {useEffect, useState} from "react";

const TableFunc = () => {

    const [completeData, setCompleteData] = useState([]);
    const [data, setData] = useState([]);
    const [text, setText] = useState("");
    const [symbolData, setSymbolData] = useState("");


    useEffect(()=>{
        fetchFirst();
    },[]);

    useEffect(()=>{
        sliceIt();
    },[completeData]);



    const fetchFirst =()=> {
        fetch("https://api2.binance.com/api/v3/ticker/24hr")
            .then(resp=>resp.json())
            .then(data=>{
                    setCompleteData(data);
                }
            )
    }
    const sliceIt =(flag)=>{
        let getTable = document.querySelector("table");
        let lastRow = getTable.rows.length-1;
        flag?setData(completeData.slice(0,lastRow+3)):setData(completeData.slice(0,3));
    }
    const fetchItAgain =()=> {
        sliceIt(true);
    }


    function updateField() {
        if(document.getElementById("txtField").value != null){
            setText(document.getElementById("txtField").value);
        }
    }

    function fetchSymbol() {
        var url = "https://api2.binance.com/api/v3/ticker/24hr?symbol=";
        if(text!=""){
            url = url+text;
            fetch(url)
                .then(resp=>resp.json())
                .then(data=>{
                    setSymbolData(data);
                })
        }
    }

    return(
        <>
            <h1>Functional Component</h1>
            <table id="tbl">
                <tbody>
                    <tr>
                        <td>Index</td>
                        <td>Symbol</td>
                        <td>Price Range</td>
                        <td>Count</td>
                    </tr>
                    {
                        data.map((item, index)=>{
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{item.symbol}</td>
                                    <td>{item.priceChange}</td>
                                    <td>{item.count}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div>
                <br/>
                Symbol: <input type="text" id={"txtField"} onChange={updateField}/>
                <input type="button" value="Submit" onClick={fetchSymbol}/>
                {
                    symbolData?(
                        <table>
                            <tbody>
                            <tr>
                                <td>{symbolData.symbol}</td>
                                <td>{symbolData.priceChange}</td>
                                <td>{symbolData.count}</td>
                            </tr>
                            </tbody>
                        </table>
                    ):null
                }
            </div>
        </>
    )
}

export default TableFunc;
import React, {useEffect, useState} from "react";

const TableFunc = () => {

    const [completeData, setCompleteData] = useState([]);
    const [data, setData] = useState([]);
    const [symblData, setSymblData] = useState(null);
    const [textField, setTextField] = useState("");

    useEffect(()=>{
        fetch("https://api2.binance.com/api/v3/ticker/24hr")
            .then(resp => resp.json())
            .then((data) => {
                setCompleteData(data);
            });
    },[])

    useEffect(() => {
        fetchStuff();
    }, [completeData])

    function fetchStuff() {
        let tblData = document.getElementById("tbl");
        let lastRow = tblData.rows.length - 1;
        if(lastRow == null || lastRow == undefined || lastRow == 0){
            setData(completeData.slice(0,3));
        }
        else{
            setData(completeData.slice(0, lastRow+3));
        }
    }

    const fetchSymbol = () =>{
        var url = "https://api2.binance.com/api/v3/ticker/24hr?symbol=";
        if(textField != ""){
            url = url+textField;
            fetch(url)
                .then(resp => resp.json())
                .then(data => setSymblData(data));
        }
    }

    return(
        <>
            <h1>Functional Component</h1>
            <table id="tbl">
                <tbody>
                <tr>
                    <th>Index</th>
                    <th>Symbol</th>
                    <th>Price Range</th>
                    <th>Count</th>
                </tr>
                {
                    data.map((obj, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{obj.symbol}</td>
                            <td>{obj.priceChange}</td>
                            <td>{obj.count}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <br/>
            <div>
                Symbol : <input type="text" id="txt" onChange={(event)=> setTextField(event.target.value)}/>
                <input type="button" onClick={()=>{
                    fetchSymbol();
                }} value={"Submit"}/>
                {
                    symblData?(
                        <table id="fetchTbl">
                            <tbody>
                            <tr>
                                <th>Symbol</th>
                                <th>Price Range</th>
                                <th>Count</th>
                            </tr>
                            {
                                <tr>
                                    <td>{symblData.symbol}</td>
                                    <td>{symblData.priceChange}</td>
                                    <td>{symblData.count}</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    ):null
                }
            </div>
        </>
    )

}

export default TableFunc;
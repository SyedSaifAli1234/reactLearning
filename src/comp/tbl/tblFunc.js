import React, {useEffect, useState} from "react";

const TableFunc = () => {

    const [arr, setArr] = useState([]);

    useEffect(()=>{
        fetch("https://api2.binance.com/api/v3/ticker/24hr")
            .then(resp => resp.json())
            .then(data => setArr(data.slice(0,3)))
    },[])


    function fetchStuff() {
        let tblData = document.getElementById("tbl");
        let lastRow = tblData.rows.length - 1;


    }

    return(
        <>
            <h1>Functional Component</h1>
            <table id="tbl" onClick={fetchStuff}>
                <tbody>
                <tr>
                    <th>Index</th>
                    <th>Symbol</th>
                    <th>Price Range</th>
                    <th>Count</th>
                </tr>
                {
                    arr.map((obj, index) => (
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
            {/*<br/>*/}
            {/*<div>*/}
            {/*    Symbol : <input type={"text"} id={"txt"}/>*/}
            {/*    <input type="button" value={"Submit"}/>*/}
            {/*    {*/}

            {/*    }*/}
            {/*</div>*/}
        </>
    )

}

export default TableFunc;
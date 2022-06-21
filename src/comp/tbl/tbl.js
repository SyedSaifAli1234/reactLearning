import React, {useEffect, useState} from "react";

const TableFunc = () => {

    const [arr, setArr] = useState([]);

    useEffect(()=>{
        fetch("https://api2.binance.com/api/v3/ticker/24hr")
            .then(resp => resp.json())
            .then(data => setArr(data.slice(0,3)))
    },[])

    return(
        <>
            <h1>Functional Component</h1>
            <table>
                <tbody>
                <tr>
                    <th>Index</th>
                    <th>Symbol</th>
                    <th>Price Range</th>
                    <th>Count</th>
                </tr>
                {
                    arr.map((obj, index) => (
                        <tr>
                            <td>{index}</td>
                            <td>{obj.symbol}</td>
                            <td>{obj.priceChange}</td>
                            <td>{obj.count}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )

}

export default TableFunc;
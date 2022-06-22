import React, {memo, useEffect, useState} from "react";
import tblClass from "./tblClass";
import axios from "axios";

const TableFunc = () => {

    const [completeData, setCompleteData] = useState([]);
    const [data, setData] = useState([]);
    const [symblData, setSymblData] = useState(null);
    const [textField, setTextField] = useState("");

    //componentDidMount
    useEffect(()=>{


        fetch("https://api2.binance.com/api/v3/ticker/24hr")
            .then(resp => resp.json())
            .then(data => this.setState({dataForTbl:data.slice(0,3)}));

        axios.get("https://api2.binance.com/api/v3/ticker/24hr")
            .then(resp => setCompleteData(resp.data) );


        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'test',
                body: 'body',
                userId: 'testuser'
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => {
           // console.log('Inserted successfully,  response: ' + JSON.stringify(json));
        });

        axios.post('https://jsonplaceholder.typicode.com/posts', {title: 'test', body: 'body', userId: 'testuser'})
            .then(resp => console.log(resp.data));

    },[])

    //componentDidUpdate
    useEffect(() => {
        fetchStuff();
    }, [completeData])

    //componentWillUnmount
    useEffect(()=>{
        return  () => {

        }
    },[])

    //render
    useEffect(()=>{

    })


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

    const symblFunction = () => (
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
    )
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
                <br/>
                {
                    symblFunction()
                }
            </div>
        </>
    )
}

export default memo(TableFunc);
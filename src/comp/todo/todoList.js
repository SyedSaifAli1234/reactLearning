import React, {useEffect, useState} from "react";
import axios from "axios";
import SearchBox from "../searchBox/searchBox";

const TodoList =() =>{

    const [completeData, setCompleteData] = useState([]);
    const [completeDataDup, setCompleteDataDup] = useState([]);
    const [toDoData, setToDoData] = useState(new Map());


    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(resp => resp.json())
            .then(data => {
                setCompleteData(data.slice(0,3));
                setCompleteDataDup(data.slice(0,3));
            });

    }, []);

    useEffect(()=>{
        let todosMap = new Map();
        completeData.map((item, index) => {
            fetch(`https://jsonplaceholder.typicode.com/users/${item.id}/todos`)
                .then(resp => resp.json())
                .then(data => {
                    todosMap.set(item.id, data.slice(0,3));
                })
        })
        setTimeout(() => {
            setToDoData(todosMap);
        },200);

    }, [completeData]);


    return(
        <>
            <SearchBox completeData = {completeData} setter = {setCompleteData} completeDataDup = {completeDataDup}/>
            <br/><br/><br/><br/><br/>
            <table>
                <tbody>
                <tr>
                    <td>Index</td>
                    <td>Name</td>
                    <td>City</td>
                    <td>To:do</td>
                </tr>
                {
                    completeData.map((item)=>{
                        return(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.address.city}</td>
                                <td>
                                    <ul>
                                        {  toDoData && toDoData.size > 0 ? (
                                                toDoData.get(item.id).map(arr => (
                                                    <li key={arr.id}> {arr.title} </li>
                                                ))
                                            ) : null
                                        }
                                    </ul>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </>
    )
}

export default TodoList;
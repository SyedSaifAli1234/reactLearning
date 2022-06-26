import React, {useEffect, useState} from "react";

const SearchBox =(props)=>{

    const [textField, setTextField] = useState("");
    const [filterArr, setFilterArr] = useState([]);
    const arr = ["nokia","apple","samsung", "app", "sam"];



    const searchIt =()=> {
        const array =[]
        const result = props.completeDataDup.filter((item)=> item.username.includes(textField));
        props.setter(result);
        console.log(result)
        //setFilterArr(array);
    }

    useEffect(()=>{
        searchIt()
    },[textField])


    return(
        <>
            <div>
                <h1>Search a user</h1>
                <input type="text" id="txtBox" onChange={(event)=>{
                    setTextField(event.target.value);
                }}/>

                {
                    filterArr.map((item)=>(
                        <p>{item}</p>
                    )
                    )
                }
            </div>
        </>
    )
}

export default SearchBox
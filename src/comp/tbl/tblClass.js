import React, {Component, useEffect} from "react";

class TblClass extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataForTbl: []
        }
    }
    componentDidMount() {
        fetch("https://api2.binance.com/api/v3/ticker/24hr")
            .then(resp => resp.json())
            .then(data => this.setState({dataForTbl:data.slice(0,3)}));
    }

    render(){
        const tableData =(
            this.state.dataForTbl.map((obj, index)=>(
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{obj.symbol}</td>
                        <td>{obj.priceChange}</td>
                        <td>{obj.count}</td>

                    </tr>
                ))
        );
        return (
            <>
            <h1>Class based Component</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Index</th>
                            <th>Symbol</th>
                            <th>Price Range</th>
                            <th>Count</th>
                        </tr>
                        {tableData}
                    </tbody>
                </table>
            </>
        )
    }
}

export default TblClass;
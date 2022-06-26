import logo from './logo.svg';
import './App.css';
import TableFunc from "./comp/tbl/tblFunc";
import TblClass from "./comp/tbl/tblClass"
import TodoList from "./comp/todo/todoList";
import SearchBox from "./comp/searchBox/searchBox";


const App =()=> {
  return (
    <div className="App">
        <br/><br/><br/><br/>
        <TodoList/>
    </div>
  );
}

export default App;

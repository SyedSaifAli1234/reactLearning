import logo from './logo.svg';
import './App.css';
import TableFunc from "./comp/tbl/tblFunc";
import TblClass from "./comp/tbl/tblClass"
import TodoList from "./comp/todo/todoList";

const App =()=> {
  return (
    <div className="App">
        <TodoList/>
    </div>
  );
}

export default App;

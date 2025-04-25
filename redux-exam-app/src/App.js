import { Provider, useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useState } from 'react';
import store from './Reducer.js/Store';
import { add_todo, remove_todo } from './Action/Action';

const TodoApp = () => {

  const [input, setInput] = useState('');
  const todos = useSelector((state)=>state.todos);
  const dispatch = useDispatch();


  const handleAddTodo = () => {
    if(input.trim()){
      dispatch(add_todo(Date.now(),input));
      setInput('');//입력창 띄우기
    }

  };
  const handleAddRemove = (id) => {
    dispatch(remove_todo(id));
  }
  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder='Add a new todo'
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => {
          <li key={todo.id}>
            {todo.text}
            <button onClick={()=> handleAddRemove(todo.id)}>REMOVE</button>
          </li>
        })}
        
      </ul>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  )

}

export default App;

import logo from './logo.svg';
import './App.css';
import Counter from './hook/UseStateEx';
import ShowHide from './exam/Exam';
import Sol1 from './exam/Exam';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState([])

  const add = (text) => {
    const newText ={
      ...text,
      id : "ID -" +text.length
    }

    setInput(prev => [...prev, newText])
  }
 


  return (
    <div className="App">
      {/* <Counter count={0}/>
      <ShowHide/ > */}

      <Sol1 add={add}/>
    </div>
  );
}

export default App;

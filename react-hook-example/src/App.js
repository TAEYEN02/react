import './App.css';
import Sol1 from './exam/Exam';
import { useState } from 'react';
import TimerFunction, { UserList,Cleanup} from './hook/UseEffectEx';
import Count from './exam/UseEffect_State';
import {Counter,InputFocus,InputSample,PreviosValue} from './hook/UseRef'

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
      {/* <Sol1 add={add}/> */}
      {/* <TimerFunction /> */}
      {/* <UserList /> */}
      {/* <Count /> */}
      {/* <Counter/> */}
      {/* <InputFocus/> */}
      {/* <InputSample /> */}
      {/* <Cleanup value={0} /> */}
      <PreviosValue />
    </div>
  );
}

export default App;

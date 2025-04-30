import { useState } from 'react';
import './App.css';
import { Counter } from './component/counter';
import { RouterEx } from './router/router';
import { MyProvider } from './context/context';
import { Parent } from './context/Parent';
import { Chiled } from './context/Chiled';

function App() {

  //useState()
  //리엑트에서 제공하는 훅(hook)
  //함수를 실행하면 상태변수 1개와, 변수의 값을 바꿔줄 수 있는 함수 1개를 요소로 갖는
  //배열을 반환
  const [count, setCount] = useState(1);

  return (
    <>
      <RouterEx />
      <Counter count={count} setCount={setCount} />
      {/* /컴포넌트의 호출 태그의 속성으로 APP.js에서 counter.js로 값을 넘겨준다 */}
    </>

  );
}

export default App;

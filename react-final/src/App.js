import { useContext, useState } from 'react';
import './App.css';
import { Counter } from './component/counter';
import { RouterEx } from './router/router';
import { Sol1 } from './exam/Sol';
import { Sol2 } from './exam/Sol2';
import { Sol3 } from './exam/Sol3';
import { Route, Routes } from 'react-router';
import { Categorie, Pdetail, Products } from './exam/categorie';
import { Home } from './exam/Language';
import { ThemeContext, ThemeSwitcher} from './exam/ThemeContext';
import { UserList } from './exam/UserList';

function App() {

  const {isDarkMode} = useContext(ThemeContext);
  //useState()
  //리엑트에서 제공하는 훅(hook)
  //함수를 실행하면 상태변수 1개와, 변수의 값을 바꿔줄 수 있는 함수 1개를 요소로 갖는
  //배열을 반환
  // const [count, setCount] = useState(1);

  return (
    // <>
    //   {/* <RouterEx />
    //   <Counter count={count} setCount={setCount} /> */}
    //   {/* /컴포넌트의 호출 태그의 속성으로 APP.js에서 counter.js로 값을 넘겨준다 */}
    //   {/* <Sol1/>
    //   <Sol2/>
    //   <Sol3/> */}
    //   <Routes>
    //     {/* <Route path="/categories/" element={<Categorie/>}/>
    //     <Route path='/categories/:categoryId' element={<Products/>}/>
    //     <Route path="/categories/:categoryId/products/:productId" element={<Pdetail/>}/> */}
    //     {/* <Route path="/:lang/home" element={<Home/>}/> */}
    //   </Routes>
    // </>
    // <div
    //   style={{
    //     backgroundColor : isDarkMode ? 'black' :  'white',
    //     color : isDarkMode ? 'white' :'black',
    //     justifyContent:'center',
    //     height:'100vh',
    //     display:'flex',
    //     alignItems:"center"
    //   }}
    // >
    //   <h1>{isDarkMode ? '다크 모드' : '라이트 모드'}</h1>
    //   <ThemeSwitcher/>
    <div>
      <UserList/>

    </div>

  );
}

export default App;

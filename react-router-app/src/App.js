import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Nevbar } from './NevBar';
import { Routing } from './route/Routing';
import { Home, NotFound, Login, PrivateRoute, Dashboard } from './Pages';
import { Home2, Categorie, Product, ProductDetail } from './Exam.js';
//Routes : switch같은 개념으로 가장 구체적인 경로를 우선 매칭한다
//Route : URL과 컴포넌트를 매핑하여 특정 경로에 맞는 컴포넌트를 랜더링한다.

//Route 컴포넌트의 주요 속성
//1. path
//URL 경로를 정의한다
//사용자가 특정 경로를 접근할 때 어떤 컴포넌트를 랜더링할지 결정한다.

//2. element
//path에 들어있는 경로와 일치할 때 랜더링할 컴포넌트를 지정한다.
function App() {

  //아이디랑 비밀번호룰 백엔드로 보내서 검증을 받았다고 가정을 한다
  const isAuthenticated = false;



  return (
    <div className="App">
      {/* 라우팅 그룹 */}
      {/* <Nevbar/> */}
      {/* <Routing /> */}
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        {/* *의 의미 : 매칭되는 주소가 없을 때  */}
        {/* <Route path='*' element={<NotFound/>}/> */}
        {/* <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<PrivateRoute element={<Home/>} isAuthenticated={isAuthenticated}/>}/> */}
        {/* <Route path='/:lang/home' element={<Home2/>}/> */}

        <Route path='/categories' element={<Categorie />} />
        <Route path='/categories/:categoryId/:catgoryName' element={<Product/>} />
        <Route path='/categories/:categoryId/products/:productId' element={<ProductDetail />} />


      </Routes>
    </div>
  );
}

export default App;

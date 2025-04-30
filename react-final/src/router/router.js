//리액트 라우터
//URL에 따라서 다른 컴포넌트를 렌더링해주고 싶을 때 사용하는 문법
//사용자가 URL을 변경하거나 네비게이션 할 때 페이지를 새로고침하지 않고도
//URL에 맞는 컴포넌트를 렌더링 할 수 있도록 해준다

//라우터를 설치!!
//npm install react-router-dom

import { Link, Outlet, Route, Routes } from "react-router";
import { Home,About,Users,OverView,Settings } from "./page";

export const RouterEx = () => {
    return(
        <div>
            {/* 주소 이동해주는거는 Link */}
            <Link to="/home">홈으로</Link>
            {' | '}
            <Link to="/about">설명으로</Link>
            {/* Routes : 내부에 선언된 Route들을 비교, 매칭해서
            URL에 맞는 컴포넌트를 렌더링한다. */}
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                {/* users/100 -> 100이 :id에 들어가게 된다. */}
                <Route path="/users/:id" element={<Users/>}/>
                <Route path="/deshboard" element={<Deshboard/>}>
                    {/* dashboard/settings */}
                    <Route path="settings" element={<Settings/>}/>
                    {/* dashboard/overview */}
                    <Route path="overview" element={<OverView/>}/>
                </Route>

            </Routes>
        </div>
    )
}

export const Deshboard = () => {
    return(
        <>
            <h1>대시보드</h1>
            <Link to="overview" >개요</Link>
            <Link to="settings">설정</Link>
            <hr/>
            <Outlet/>{/* 자식 라우트 컴포넌트가 렌더링되는 자리 */}
        </>
    )
}

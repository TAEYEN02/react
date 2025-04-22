import { Routes, Route } from 'react-router-dom';
import { Home, About, PostDetail, UserProfile, Dashboard, Overview,Settings } from '../Pages.js';

export const Routing = () => {
    return (
        <>
            <Routes>
                {/* 주소창에 path가 일치하면 컴포넌트를 랜더링한다 */}
                {/* <Route path='/' element={<Home/>}/> */}
                {/* 동적 라우팅이 되는 원리
        리엑트 라우터가 내부에서 정규표현식으로 변환을 한다
        "/users/:userId/settings/:tab"
        /^users/([^/]+)/settings/([^/]+)$/ */}
                {/* <Route path='/users/:id' element={<UserProfile/>}/> */}
                {/* <Route path='/about' element={<About/>}/>
        <Route path='/posts/:postId' element={<PostDetail/>}/> */}

                {/* /dashboard 이하의 모든 경로를 이 라우트가 잡아낸다 */}
                {/* /dasdhboard/overview, /dashboard/settings 등*/}
                <Route>
                    <Route path="/dashboard" element={<Dashboard />}>
                        <Route path="overview" element={<Overview />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Route>
            </Routes>

        </>
    )
}
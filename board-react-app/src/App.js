import './App.css';
import BoardProvider from './context/BoardContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BoardList } from './pages/BoardList';
import WritePost from './pages/WritePost';
import PostDetail from './pages/postDetail';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <BoardProvider>
      <BrowserRouter>
        <Routes>
          {/* 공개 페이지 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 보호된 페이지 */}
          <Route path="/"           element={<PrivateRoute><BoardList /></PrivateRoute>} />
          <Route path="/post/:id"   element={<PrivateRoute><PostDetail /></PrivateRoute>} />
          <Route path="/write"      element={<PrivateRoute><WritePost /></PrivateRoute>} />
          <Route path="/edit/:id"   element={<PrivateRoute><EditPost /></PrivateRoute>} />

          {/* 잘못된 경로 - 기본 홈으로 이동 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </BoardProvider>
  );
}

export default App;

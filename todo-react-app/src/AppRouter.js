import './index.css';
import App from './App';
import Login from './Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

export const Copyright =() => {
    return(
        //Typography 컴포넌트
        //text에 style을 적용할 때 사용되는 컴포넌트이다
        //variant : html태그 설정
        //color : 텍스트의 색상 지정
        //align : 텍스트의 정렬 방식
        <Typography variant='body2' color='textSecondary' align='center'>
            {"Copyright "}
            fsoftwareengineer,{new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export const AppRouter = () => {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<App/>}/>
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </div>
    )
}
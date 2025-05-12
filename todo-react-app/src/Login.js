import {Container, Grid, Typography, TextField, Button} from '@mui/material';
import { signin } from './service/ApiService';
const Login = () => {

     const handleSubmit = (event) => {
        event.preventDefault(); // 페이지가 새로고침되지 않도록 기본 동작을 막음
        const data = new FormData(event.target); // 제출된 폼 데이터 가져옴
        const username = data.get("username"); // username 필드 값 가져오기
        const password = data.get("password"); // password 필드 값 가져오기
        console.log(username); // 콘솔에 이메일 출력 (디버깅용)
        console.log(password); // 콘솔에 비밀번호 출력 (디버깅용)
        // ApiService의 signin 메서드를 사용해 로그인 요청을 서버에 보냄
        signin({ username: username, password: password });
    };
    
    return(
        <Container component="main" maxWidth="xs" style={{marginTop:"8%"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant='h5'>
                        로그인
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs = {12}>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            id="username"
                            label="이메일 주소"
                            name="username"
                            autoComplete='username'
                        />
                    </Grid>
                    <Grid item xs = {12}>
                        <TextField
                            variant='outlined'
                            required
                            fullWidth
                            id="password"
                            label="패스워드"
                            name="password"
                            type="password"
                            autoComplete='current-password'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant='contained'
                            color='primary'>
                                로그인
                            </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Login;
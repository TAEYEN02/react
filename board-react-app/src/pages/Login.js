import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, Stack, Link as MuiLink } from "@mui/material";
import { signin } from "../api/api.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");

    try {
      const response = await signin({ username, password });

      if (response.token) {
        localStorage.setItem("ACCESS_TOKEN", response.token); // 꼭 토큰 저장해줘야 로그인 유지됨
        setSuccessMsg("로그인 성공!");
        alert("로그인 성공!");
        navigate("/");
      } else {
        setErrorMsg("로그인 실패: 아이디/비밀번호를 확인하세요.");
      }
    } catch (err) {
      setErrorMsg("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        로그인
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            id="username"
            label="아이디"
            name="username"
            autoComplete="username"
            autoFocus
          />

          <TextField
            required
            fullWidth
            id="password"
            label="비밀번호"
            name="password"
            type="password"
            autoComplete="current-password"
          />

          {errorMsg && (
            <Typography color="error" variant="body2">
              {errorMsg}
            </Typography>
          )}

          {successMsg && (
            <Typography color="primary" variant="body2">
              {successMsg}
            </Typography>
          )}

          <Button type="submit" fullWidth variant="contained" color="primary">
            로그인
          </Button>

          <Typography variant="body2" align="center">
            계정이 없으신가요?{" "}
            <MuiLink component={Link} to="/signup">
              회원가입
            </MuiLink>
          </Typography>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;

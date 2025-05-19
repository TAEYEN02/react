import React, { useState } from "react";
import { Container, Grid, Typography, TextField, Button, Box } from "@mui/material";
import { signup } from "../api/api.js"

export function Signup() {
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username");
    const password = data.get("password");

    signup({ username, password })
      .then(() => {
        alert("계정 생성 성공! 로그인 페이지로 이동합니다.");
        window.location.href = "/login";
      })
      .catch((error) => {
        // 서버에서 중복 아이디 등 에러 메시지 받음
        if (error.response && error.response.data) {
          setErrorMsg(error.response.data.message || "회원가입 실패");
        } else {
          setErrorMsg("서버 에러가 발생했습니다.");
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        계정 생성
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="아이디"
              name="username"
              autoFocus
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="패스워드"
              name="password"
              type="password"
            />
          </Grid>

          {errorMsg && (
            <Grid item xs={12}>
              <Typography color="error" variant="body2">
                {errorMsg}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              계정 생성
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Signup;

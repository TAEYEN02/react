import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    alert("로그아웃 되었습니다.");
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <Button variant="outlined" color="secondary" onClick={handleLogout}>
      로그아웃
    </Button>
  );
};

export default LogoutButton;

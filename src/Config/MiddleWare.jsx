import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PathList from "../Common/PathList";

export const Middleware = ({ children }) => {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const isLogin = JSON.parse(localStorage.getItem("Lottery"));

  useEffect(() => {
    setloading(true);
    if (!isLogin) {
      navigate(PathList.Login);
    }
    setloading(false);
  }, [isLogin, navigate]);

  return !loading && isLogin ? children : null;
};
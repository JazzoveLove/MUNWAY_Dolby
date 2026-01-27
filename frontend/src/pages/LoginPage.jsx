import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

const LoginPage = () => {
    const navigate = useNavigate();
  
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = await loginUser({ username: login, password: password });
  
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
  
        navigate("/");
      } catch (error) {
        console.error(error);
        setError("Wrong username or password");
        throw error;
      }
    };
  
    return (
      <>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Login</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
  
          <button type="submit">Zaloguj</button>
        </form>
      </>
    );
  };

export default LoginPage;
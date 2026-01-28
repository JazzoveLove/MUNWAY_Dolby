import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser as apiLogin } from "../api/authApi";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiLogin({ username: login, password: password });

      loginUser(data.access);
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

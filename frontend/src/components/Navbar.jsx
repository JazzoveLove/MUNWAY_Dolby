import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Navbar() {
  // 1. Pobieramy stan (user) i funkcję (logOutUser) z Centrali
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#eee",
      }}
    >
      <div>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <h2>MUNWAY</h2>
        </Link>
      </div>

      <div>
        {/* 2. Sprawdzamy 'user' zamiast starego 'isLoggedIn' */}
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Opcjonalnie: Możesz tu wyświetlić np. "Witaj!" zamiast ikonki */}
            <span style={{ fontSize: "20px" }}>👤</span>

            {/* 3. Używamy funkcji wylogowania prosto z Contextu */}
            <button onClick={logOutUser}>Wyloguj</button>
          </div>
        ) : (
          <Link to="/login">
            <button>Sign in</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

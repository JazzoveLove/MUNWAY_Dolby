import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";

function Navbar() {
  // 1. Pobieramy stan (user) i funkcję (logOutUser) z AuthContext
  const { user, logOutUser } = useContext(AuthContext);

  // 2. Pobieramy licznik z CartContext
  const { cartCount } = useContext(CartContext);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#eee",
        alignItems: "center", // Dodałem, żeby elementy były równo w pionie
      }}
    >
      <div>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <h2>MUNWAY</h2>
        </Link>
      </div>

      <div>
        {/* 3. Logika wyświetlania: Zalogowany vs Niezalogowany */}
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {/* --- NOWA WERSJA (KLIKALNA) --- */}
            <Link
              to="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                🛒 ({cartCount})
              </span>
            </Link>
            {/* ------------------------------- */}

            <span style={{ fontSize: "20px" }}>👤</span>

            <button onClick={logOutUser} style={{ cursor: "pointer" }}>
              Wyloguj
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button style={{ cursor: "pointer" }}>Sign in</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

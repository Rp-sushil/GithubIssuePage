import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header style={headerStyle}>
        <h1>Issue-List</h1>
        <Link to="/" style={linkStyle}>
          {" "}
          Home
        </Link>{" "}
        |{" "}
        <Link to="/about" style={linkStyle}>
          {" "}
          about{" "}
        </Link>
      </header>
    </div>
  );
}

const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

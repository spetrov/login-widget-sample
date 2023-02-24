import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../app";

function Header(props) {
  const { auth } = useContext(AuthContext);

  console.log("Header auth:" + auth);
  return (
    <div id="header">
      <h4>Login Widget Demo</h4>
      <nav>
        {auth ? <Link to="/">Home</Link> : null} <Link to="login">Login</Link>{" "}
        {auth ? <Link to="logout">Logout</Link> : null}{" "}
        <Link to="signup">Sign Up</Link>
      </nav>
    </div>
  );
}

export default Header;

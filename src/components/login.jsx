import "@forgerock/login-widget/widget.css";
import React, { useContext, useEffect } from "react";
import { Navigate, redirect } from "react-router-dom";
import { AuthContext } from "./app";

function Login(props) {
  const { auth, setTree } = useContext(AuthContext);

  useEffect(() => {
    setTree(props.tree);
  }, [setTree, props.tree]);

  return auth ? <Navigate to="/" /> : null;
}

function Logout() {
  const { setLogout, auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      setLogout();
      redirect("/");
    }
  }, [setLogout, auth]);

  return null;
}

function UserInfo() {
  const { auth, info } = useContext(AuthContext);
  console.log("User info: " + info);
  console.log("auth: " + auth);

  useEffect(() => {
    if (!auth) {
      redirect("/login");
    }
  }, [auth]);

  return info ? (
    <div>
      <pre>UserInfo: {JSON.stringify(info, null, "  ")}</pre>
    </div>
  ) : (
    <div>
      <pre>Please log in...</pre>
    </div>
  );
}

export { Login, Logout, UserInfo };

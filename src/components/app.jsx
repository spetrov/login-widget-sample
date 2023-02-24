import React, { useEffect, useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Widget, { journey, user } from "@forgerock/login-widget/inline";
import Header from "./header/header";
import { Login, Logout, UserInfo } from "./login";

export const AuthContext = React.createContext({});

const widgetRoot = document.getElementById("main");

function App() {
  const [auth, setAuth] = useState(false);
  const [info, setInfo] = useState(false);
  const [tree, setTree] = useState("Login");

  async function setLogout() {
    const tokens = await user.tokens();
    if (tokens) {
      await user.logout();
      setAuth(false);
      setInfo(false);
    }
  }

  const location = useLocation();

  useEffect(() => {
    const newWidget = new Widget({
      target: widgetRoot,
      props: {
        config: {
          serverConfig: {
            baseUrl: "https://openam-sdks-dbind.forgeblocks.com/am",
            timeout: 5000,
          },
          realmPath: "alpha",
          clientId: "ForgeRockSDKClient",
          redirectUri: "https://sdkapp.example.com:8443/callback",
          scope: "openid profile email address phone",
        },
      },
    });
    // setWidget(newWidget);

    journey.onSuccess((response) => {
      console.log(response);
      if (response?.user?.completed) {
        setAuth(response.user.completed);
        setInfo(response?.user?.response);
      }
    });

    return () => {
      newWidget.$destroy();
    };
  }, [location]);

  useEffect(() => {
    journey.start({ journey: tree });
  }, [tree]);

  return (
    <div className="App">
      <div className="container">
        <AuthContext.Provider value={{ info, auth, setLogout, setTree }}>
          <Header />

          <Routes>
            <Route exact path="/" element={<UserInfo />} />
            <Route path="/login" element={<Login tree={"Login"} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Login tree={"Registration"} />} />
          </Routes>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default () => (
  <Router>
    <App />
  </Router>
);

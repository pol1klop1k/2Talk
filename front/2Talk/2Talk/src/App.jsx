import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/AppRouter";
import { Sidebar } from "./components/Sidebar/Sidebar";
import axios, { chatsUrl } from "./axios";
import { Context } from "./context";
import { CSS } from "./utils/colors";

const App = () => {
  const [randomColor, setRandomColor] = useState("");

  const url = '/api/v1/users/auth/login/';

  const getToken = () => {
    axios.get(
      url
    ).then(data => data)
  }

  useEffect(() => {
    const randomCssColor = CSS[Object.keys(CSS)[Math.floor(Math.random() * Object.keys(CSS).length)]];
    setRandomColor(randomCssColor);

    getToken();
  }, [])

  return (
    <Context.Provider value={{ randomColor }}>
      <div className="App">
        <BrowserRouter>

          <div className="App_content">
            {/* <Sidebar /> */}
            <AppRouter />
          </div>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;

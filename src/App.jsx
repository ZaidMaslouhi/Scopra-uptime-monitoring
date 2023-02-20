import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        {routes &&
          routes.map((route) => {
            return <Route key={route.key} {...route} />;
          })}
      </Routes>
    </div>
  );
}

export default App;

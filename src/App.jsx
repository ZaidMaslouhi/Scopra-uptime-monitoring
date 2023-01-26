import React from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  return (
    <div className="App">
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

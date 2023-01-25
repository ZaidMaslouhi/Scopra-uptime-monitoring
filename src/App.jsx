import React from "react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {routes &&
            routes.map((route) => {
              return <Route key={route.key} {...route} />;
            })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

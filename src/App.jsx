import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GetInTouch from "./pages/GetInTouch";
import NotFound from "./pages/NotFound";

function App() {
  const routes = [
    { key: 1, path: "/", element: <GetInTouch />, exact: true },
    { key: 2, path: "*", element: <NotFound /> },
  ];

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

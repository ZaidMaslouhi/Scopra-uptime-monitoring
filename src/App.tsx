import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./utils/routes/routes";
import { Toaster } from "react-hot-toast";
import LoadingAnimation from "./components/ui/loading/LoadingAnimation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase.config";
import { useAppDispatch } from "./utils/hooks/react-redux-hooks";
import { saveUser, verifyUser } from "./store/slices/auth.slice";
import { toUserInfo } from "./interfaces/auth.interface";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyUser());
    onAuthStateChanged(auth, (user) => {
      dispatch(saveUser(toUserInfo(user)));
    });
  }, [auth, dispatch]);

  return (
    <div className="App">
      <Toaster />
      <Suspense fallback={<LoadingAnimation />}>
        <Routes>
          {routes &&
            routes.map((route) => {
              return <Route {...route} />;
            })}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

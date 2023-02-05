import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

function useAuth() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setCurrentUser(user));
  }, [currentUser]);

  return { currentUser };
}

export default useAuth;

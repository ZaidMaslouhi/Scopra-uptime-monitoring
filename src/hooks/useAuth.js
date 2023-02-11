import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingCurrentUser, setLoadingCurrentUser] = useState(true);

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoadingCurrentUser(false);
    });
    return () => {
      unlisten();
    };
  }, [currentUser]);

  return { currentUser, loadingCurrentUser };
}

export default useAuth;

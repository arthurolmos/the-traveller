import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const auth = getAuth();

  const [user, setUser] = React.useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

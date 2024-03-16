"use client";
import React from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/firebase/config";

import LoginButton from "@/components/LoginButton";

const auth = getAuth(firebase_app);

type iUserContext = {
  user: User | null;
  loading: boolean;
};
type Props = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({} as iUserContext);
export const useAuthContext = () => React.useContext(AuthContext);
export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // unsubscribe();

    return () => unsubscribe();
  }, []);
  //   console.log(user);
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {user ? (
            children
          ) : (
            <div>
              <LoginButton></LoginButton>
            </div>
          )}
        </div>
      )}
    </AuthContext.Provider>
  );
};

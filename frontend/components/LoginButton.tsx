import React from "react";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa6";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "@/firebase/config";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  let router = useRouter();
  let login = async () => {
    try {
      const googleSignin = await signInWithPopup(auth, provider);
      console.log(googleSignin);
      googleSignin && router.push("/");
    } catch {
      alert("Failed to log in with Google");
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="bg-slate-500 w-24 h-24 flex justify-center items-center rounded-sm shadow-sm">
        <Button
          onClick={() => {
            login();
          }}
          className="text-white"
        >
          <FaGoogle></FaGoogle>
        </Button>
      </div>
    </div>
  );
};

export default LoginButton;

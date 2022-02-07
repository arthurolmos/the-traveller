import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function SignUp() {
  const auth = getAuth();

  console.log({ auth });
  return <div></div>;
}

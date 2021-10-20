import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

function Login() {
  const [currForm, setCurrForm] = useState("signup");
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const changeForm = () => {
    if (currForm === "signup") {
      setCurrForm("login");
    } else {
      setCurrForm("signup");
    }
  };

  return (
    <>
      <main className="login-bcg">
        <section className="login">
          <div className="form-wrapper">
            {currForm === "signup" ? <SignupForm></SignupForm> : <LoginForm />}

            <button
              type="button"
              className="google-acc-btn"
              onClick={signInWithGoogle}
            >
              <span className="icon">
                <FcGoogle aria-hidden="true" />
              </span>
              Continue with Google
            </button>
          </div>
        </section>
        <span className="switch-form">
          Have an account?
          <button type="button" onClick={changeForm}>
            Sign In
          </button>
        </span>
      </main>
    </>
  );
}

export default Login;

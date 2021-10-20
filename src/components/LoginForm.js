import React from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { useEffect } from "react";
import UserInputMessage from "./UserInputMessage";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    if (email && password && !serverError) {
      signInWithEmailAndPassword(auth, email, password).catch((err) => {
        console.log(err);
        setServerError("no password/email combination was found");
      });
    }
  };

  useEffect(() => {
    let timeout;
    if (serverError && timeout === undefined) {
      console.log("set the timeout for the message");
      timeout = setTimeout(() => {
        setServerError("");
        clearTimeout(timeout);
      }, 3000);
    }
  }, [serverError]);
  return (
    <>
      <ErrorMessage error={serverError} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1>Log In</h1>
        <label>
          <span className="visually-hidden">email</span>
          {errors.email && <UserInputMessage message={errors.email.message} />}

          <input
            type="email"
            placeholder="Email"
            name="email"
            {...register("email", {
              required: "Email is required.",
            })}
          />
          <span className="input-icon">
            <MdOutlineMail aria-hidden="true" />
          </span>
        </label>
        <label>
          <span className="visually-hidden">password </span>
          {errors.password && (
            <UserInputMessage message={errors.password.message} />
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            {...register("password", {
              required: "Password is required.",
            })}
          />
          <span className="input-icon">
            <IoLockClosedOutline aria-hidden="true" />
          </span>
        </label>
        <button type="submit" className="submit-form-btn">
          Log in
        </button>
      </form>
    </>
  );
}

export default LoginForm;

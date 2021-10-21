import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { IoPersonOutline, IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import ErrorMessage from "./ErrorMessage";
import UserInputMessage from "./UserInputMessage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const NAME_REGEX = /^(?:([A-Za-zéàë]{2,40}) ?)+$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function SignupForm() {
  const [error, setError] = useState(null);
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .test("name", "Invalid name.", (value) => NAME_REGEX.test(value)),
    email: yup
      .string()
      .required("Email is required.")
      .test(
        "email",
        "Invalid email.",
        (value) => !value || EMAIL_REGEX.test(value)
      ),
    password: yup
      .string()
      .required("Email is required.")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          updateProfile(auth.currentUser, {
            displayName: data.name,
          });
        })
        .catch((err) => {
          setError("User already exists");
        });
    }
  };

  const removeError = () => {
    if (error) setError("");
  };

  return (
    <>
      <ErrorMessage error={error} />
      <form onSubmit={handleSubmit(onSubmit)} onClick={removeError} noValidate>
        <h1>Sign Up</h1>
        <label>
          <span className="visually-hidden"> name</span>
          {errors.name && <UserInputMessage message={errors.name.message} />}
          <input
            type="text"
            name="name"
            placeholder="Name"
            {...register("name")}
          />
          <span className="input-icon">
            <IoPersonOutline aria-hidden="true" />
          </span>
        </label>
        <label>
          <span className="visually-hidden"> email</span>
          {errors.email && <UserInputMessage message={errors.email.message} />}
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email")}
          />
          <span className="input-icon">
            <MdOutlineMail aria-hidden="true" />
          </span>
        </label>
        <label>
          <span className="visually-hidden"> password</span>
          {errors.password && (
            <UserInputMessage message={errors.password.message} />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password")}
          />
          <span className="input-icon">
            <IoLockClosedOutline aria-hidden="true" />
          </span>
        </label>
        <label>
          <span className="visually-hidden"> confirm password</span>
          {errors.confirmPassword && (
            <UserInputMessage message={errors.confirmPassword.message} />
          )}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          <span className="input-icon">
            <IoLockClosedOutline aria-hidden="true" />
          </span>
        </label>
        <button type="submit" className="submit-form-btn">
          Sign up
        </button>
      </form>
    </>
  );
}

export default SignupForm;
